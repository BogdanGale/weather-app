const request = require('request')

const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=9c5ee7e422c2a83ac35e6ae171cfc557&query=${lat},${long}`

	request({ url, json: true }, (error, { body }) => {
		try {
			if (error) {
				callback('Unable to connect to forecast services!', undefined)
			} else if (body.error) {
				callback('Unable to retrieve forecast. Try another search.', undefined)
			} else {
				const { weather_descriptions, temperature, feelslike } = body.current

				callback(
					undefined,
					`${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
				)
			}
		} catch (err) {
			console.log(err, error)
		}
	})
}

module.exports = { forecast }
