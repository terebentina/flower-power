const app = require('express')();
const wt = require('webtask-tools');

function sendResponse(res, code, message) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ statusCode: code, message }));
}

const write = (req, res) => {
  req.webtaskContext.storage.get((error, data) => {
    if (error) {
      sendResponse(res, 400, error);
    }
    const newData = data || [];
    newData.push({
      date: Date.now(),
      temp: req.webtaskContext.data.temp || 0,
      humidity: req.webtaskContext.data.humidity || 0,
      moisture: req.webtaskContext.data.moisture || 0,
    });
    req.webtaskContext.storage.set(newData, (err) => {
      if (err) {
        sendResponse(res, 400, err);
      }

      sendResponse(res, 200, 'Sensor data saved');
    });
  });
};

app.post('/write', write);
app.get('/write', write);

app.get('/read', (req, res) => {
  req.webtaskContext.storage.get((error, data) => {
    if (error) {
      sendResponse(res, 400, error);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data || []));
  });
});

module.exports = wt.fromExpress(app);
