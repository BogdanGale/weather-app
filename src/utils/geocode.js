const request = require('request')

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?types=place&limit=1&access_token=pk.eyJ1IjoiYm9nZGFuZ2FsZSIsImEiOiJja3QxMnZqaGQwNmNpMnltbDg4dXdyczN4In0.trk3iq0WxPORNpwmRbgnmQ`

	request({ url, json: true }, (error, { body }) => {
		try {
			if (error) {
				callback('Unable to connect to location services!', undefined)
			} else if (body.features.length === 0) {
				callback('Unable to find location. Try another search.', undefined)
			} else {
				const [features] = body.features
				const { center, place_name } = features
				callback(undefined, {
					latitude: center[1],
					longitude: center[0],
					location: place_name
				})
			}
		} catch (err) {
			console.log(err, error)
		}
	})
}

module.exports = { geocode }
