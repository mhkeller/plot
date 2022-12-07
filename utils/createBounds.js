import { bodyMargin } from '../settings/index.js'

export default function createBounds(boundingBox) {
	return {
		width: boundingBox.x + boundingBox.width,
		height: boundingBox.y + boundingBox.height + bodyMargin * 2 + 4
	}
}
