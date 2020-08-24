const request = require('request');
const forecast = (lat, long, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=a90fa23a8d2050bf26a0601e746868c6&query=' + long + ',' + lat;

	// request({ url, json: true }, (error, {response}) => {
	// 	if (error) {
	// 		callback('Unable connect to the service', undefined);
	// 	} else if (response.body.error) {
	// 		callback('Unable to find the location. Try another location ', undefined);
	// 	} else {
	// 		callback(
	// 			undefined,
	// 			response.body.current.weather_descriptions[0] +
	// 				'. It is currently ' +
	// 				response.body.current.temperature +
	// 				' degrees out.' +
	// 				' It feels like ' +
	// 				response.body.current.feelslike +
	// 				' degrees out'
	// 		);
	// 	}
	// });

	// setelah  destructuring
	request({ url, json: true }, (error, { body }) => {
		console.log(body);
		if (error) {
			callback('Unable connect to the service', undefined);
		} else if (body.error) {
			callback('Unable to find the location. Try another location ', undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					'. It is currently ' +
					body.current.temperature +
					' degrees out.' +
					' It feels like ' +
					body.current.feelslike +
					' degrees out ' +
					'the wind speed is ' +
					body.current.wind_speed +
					' and the wind degree ' +
					body.current.wind_degree
			);
		}
	});
};

module.exports = forecast;
