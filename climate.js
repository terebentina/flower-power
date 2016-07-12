var tessel = require('tessel');
var climatelib = require('climate-si7020');
var https = require('https');

var climate = climatelib.use(tessel.port['D']);

var DRY = 9746;
var WET = 3851;
var zeroDry = DRY - WET;
var zeroWet = 0;

var moisturePowerPin = tessel.port['GPIO'].digital[0];

// Turn power off at start on the moisturePowerPin. We only turn it on to read the sensor then turn it back off
// This is done to prevent corrosion due to electrolisis on the sensor.
moisturePowerPin.output(0);

var moistureReadPin = tessel.port['GPIO'].analog[0];

function convertMoistureValue(value) {
	if (value < WET) {
		return 100;
	}
	if (value > DRY) {
		return 0;
	}

	value = value - WET;

	return Math.round(100 - (value * 100 / zeroDry));
}

var sendData = function(temp, humid, moisture) {
	var queryData = 'temp=' + temp + '&humidity=' + humid + '&moisture=' + moisture;

	https.get('https://webtask.it.auth0.com/api/run/wt-dancaragea-gmail_com-0/webtask?webtask_no_cache=1&' + queryData, function(res) {
		// console.log('STATUS:', res.statusCode);
		// console.log('HEADERS:', JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			console.log('BODY:', chunk);
		});
		res.on('end', function() {
			console.log('No more data in response.')
		});
	});
};

climate.on('ready', function () {
	console.log('Connected to si7020');

	// Loop forever
	setImmediate(function loop () {
		climate.readTemperature('c', function (err, temp) {
			climate.readHumidity(function (err, humid) {
				moisturePowerPin.output(1);
				setTimeout(function() {
					var moisture = convertMoistureValue(Math.round(moistureReadPin.read() * 10000));
					moisturePowerPin.output(0);
					console.log('Degrees:', temp.toFixed(2) + 'C', 'Humidity:', humid.toFixed(2) + ' %RH', 'Moisture:', moisture);

					sendData(temp.toFixed(2), humid.toFixed(2), moisture);

					setTimeout(loop, 600000);	// every 10 mins
					// setTimeout(loop, 3000);	// every 3 seconds
				}, 2000);

			});
		});
	});
});

climate.on('error', function(err) {
	console.log('error connecting module', err);
});
