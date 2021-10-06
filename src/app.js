const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', { title: 'Weather', name: 'Bogdan Gale' })
})

app.get('/about', (req, res) => {
	res.render('about', { title: 'About me', name: 'Bogdan Gale' })
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'This is a help message',
		name: 'Bogdan Gale'
	})
})

app.get('/weather', (req, res) => {
	if (req.query.address) {
		geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error })
			}
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error })
				}
				res.send({
					forecast: forecastData,
					location: location,
					address: req.query.address
				})
			})
		})
	} else {
		res.send({ error: 'You must provide an address' })
	}
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({ error: 'You must provide a search term' })
	}
	res.send({ products: [] })
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found',
		name: 'Bogdan Gale'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found',
		name: 'Bogdan Gale'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})
