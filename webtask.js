module.exports = (ctx, cb) => {
	ctx.storage.get((error, data) => {
		if (error) {
			return cb(error);
		}
		const newData = data || [];
		newData.push({
			date: new Date(),
			temp: ctx.data.temp,
			humidity: ctx.data.humidity,
			moisture: ctx.data.moisture,
		});
		ctx.storage.set(newData, (err) => {
			if (err) {
				return cb(err);
			}
			cb(null, `Sensor data saved, current data: ${JSON.stringify(newData)}`);
		});
	});
};
