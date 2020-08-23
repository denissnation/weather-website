const express = require('express');
const path = require('path');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode');

const app = express();
const port = process.env.PORT || 3000;
// Define paths for exprees config
const pathJoinDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(pathJoinDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Denis'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Denis'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Denis'
	});
});

// app.get('/help', (req, res) => {
// 	res.send('Help Pages');
// });

// app.get('/about', (req, res) => {
// 	res.send('<h1>About Pages </h1>');
// });

app.get('/weather', (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: 'Provide the address please!'
		});
	}
	// console.log(address);
	geoCode(address, (error, { longitude, latitude, location } = {}) => {
		// (error, { longitude, latitude, location } = {} ini digunakan apabila parameter tidak di berikan)
		if (error) {
			return res.send({ error });
		}

		forecast(longitude, latitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				location,
				forecast: forecastData,
				address
			});
		});
	});
	// 	forecast: 'It is Raining',
	// 	address: req.query.address,
	// 	temperature: '25 C'
	// });
});

app.get('/products', (req, res) => {
	if (!req.query.test) {
		return res.send('Provide some query please!!');
	}
	console.log(req.query.and);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Denis',
		errorMessage: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Denis',
		errorMessage: 'Page Not Foun'
	});
});

app.listen(port, () => {
	console.log('Server is up in port ' + port);
});
