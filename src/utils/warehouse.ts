import {
	flatten, filter, map, find, forEach
} from 'lodash'
import { IProductPosition, IProduct } from '../types/interfaces'

const getProductPositionCombinations = (productPositions: IProductPosition[], desiredProducts: IProduct[]): IProductPosition[][] => {
	const productPositionsMap: { [key: string]: string[] } = {}
	const results: IProductPosition[][] = []

	productPositions.forEach((p) => {
		if (!productPositionsMap[p.productId]) {
			productPositionsMap[p.productId] = []
		}
		productPositionsMap[p.productId].push(p.positionId)
	})

	const generateProductCombinationsHelper = (currentCombination: IProductPosition[], remainingProducts: IProduct[]) => {
		if (remainingProducts.length === 0) {
			results.push([...currentCombination])
			return
		}

		const product = remainingProducts[0]
		const positions = productPositionsMap[product.productId]

		if (!positions) return

		for (let i = 0; i < positions.length; i++) {
			const position = positions[i]
			currentCombination.push(find(productPositions, (p) => p.positionId === position && p.productId === product.productId))
			generateProductCombinationsHelper(currentCombination, remainingProducts.slice(1))
			currentCombination.pop()
		}
	}

	generateProductCombinationsHelper([], desiredProducts)

	return results
}

const getDistance = (position1: IProductPosition, position2: IProductPosition): number => {
	const deltaX = position2.x - position1.x
	const deltaY = position2.y - position1.y
	const deltaZ = position2.z - position1.z
	const distanceSquared = (deltaX ** 2) + (deltaY ** 2) + (deltaZ ** 2)
	const distance = Math.sqrt(distanceSquared)
	return distance
}

const getShortestDistance = (positions: IProductPosition[]): { positions: IProductPosition[], distance: number } => {
	let shortestPath: IProductPosition[] = []
	let shortestDistance = Infinity

	for (let i = 0; i < positions.length; i++) {
		let startingPoint = positions[i]
		const visitedPoints: IProductPosition[] = [startingPoint]
		const remainingPoints: IProductPosition[] = positions.filter((p) => p !== startingPoint)

		while (remainingPoints.length !== 0) {
			const distances: { [key: string]: number } = {}
			// eslint-disable-next-line no-restricted-syntax
			for (const point of remainingPoints) {
				distances[point.positionId] = getDistance(startingPoint, point)
			}
			const nextPoint = remainingPoints.reduce((acc, curr) => (distances[curr.positionId] < distances[acc.positionId] ? curr : acc))
			visitedPoints.push(nextPoint)
			remainingPoints.splice(remainingPoints.indexOf(nextPoint), 1)
			startingPoint = nextPoint
		}

		let totalDistance = 0
		for (let j = 0; j < visitedPoints.length - 1; j++) {
			totalDistance += getDistance(visitedPoints[j], visitedPoints[j + 1])
		}

		if (totalDistance < shortestDistance) {
			shortestPath = visitedPoints
			shortestDistance = totalDistance
		}
	}

	return { positions: shortestPath, distance: shortestDistance }
}

const getOptimizedPickingOrder = (productPositionCombinations: IProductPosition[][]): { positions: IProductPosition[], distance: number} => {
	let shortestDistance = Infinity
	let shortestCombination: IProductPosition[] = []

	forEach(productPositionCombinations, (positionCombination) => {
		const { positions, distance } = getShortestDistance(positionCombination)
		if (distance < shortestDistance) {
			shortestDistance = distance
			shortestCombination = positions
		}
	})

	return { positions: shortestCombination, distance: shortestDistance !== Infinity ? shortestDistance : 0 }
}

export default (productsWithPositions: IProductPosition[][]) => {
	// Positions that are not empty only
	const positions: IProductPosition[] = filter(flatten(productsWithPositions), (product) => product.quantity > 0)
	const products: IProduct[] = map(productsWithPositions, (product) => ({ productId: product[0].productId	}))
	const productPositionCombinations = getProductPositionCombinations(positions, products)
	const optimizedPickingOrder = getOptimizedPickingOrder(productPositionCombinations)

	return {
		positions: map(optimizedPickingOrder.positions, (position) => ({
			productId: position.productId,
			positionId: position.positionId
		})),
		distance: optimizedPickingOrder.distance
	}
}
