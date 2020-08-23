const request = require('request');
const geoCode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoiZG5pc25hc3QiLCJhIjoiY2tkeTkwZnA4MjNoNjJydDZuaDYyd3drZyJ9.W3wbHBFeoWFzRQYMxwREPA&limit=1';
	// request({ url: url, json: true }, (error, response) => {
	// 	if (error) {
	// 		callback('Unable to connect to location service', undefined);
	// 	} else if (response.body.features[0].length === 0) {
	// 		callback('unable to find the location. Try another Search', undefined);
	// 	} else {
	// 		callback(undefined, {
	// 			longitude: response.body.features[0].center[0],
	// 			latitude: response.body.features[0].center[1],
	// 			location: response.body.features[0].place_name
	// 		});
	// 	}
	// });

	// setelah destructuring
	request({ url, json: true }, (error, { body }) => {
		// return console.log(body);
		if (error) {
			callback('Unable to connect to location service', undefined);
		} else if (body.features.length === 0) {
			callback('unable to find the location. Try another Search', undefined);
		} else {
			callback(undefined, {
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geoCode;
