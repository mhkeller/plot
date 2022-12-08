import { bodyMargin } from '../settings/settings.js'

export default function createBounds(boundingBox) {
	return {
		width: boundingBox.x + boundingBox.width,
		height: boundingBox.y + boundingBox.height + bodyMargin * 2 + 4
	}
}
