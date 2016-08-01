export function retrieveData() {
  return fetch('https://webtask.it.auth0.com/api/run/wt-dancaragea-gmail_com-0/webtask/read?webtask_no_cache=1')
    .then((res) => res.json());
}

export function parseWebtaskData(data = []) {
  const temperature = {
    name: 'temp',
    values: [],
  };
  const humidity = {
    name: 'humidity',
    values: [],
  };
  const moisture = {
    name: 'moisture',
    values: [],
  };

  data.forEach((obj) => {
    temperature.values.push({ x: obj.ts, y: obj.temp });
    humidity.values.push({ x: obj.ts, y: obj.humidity });
    moisture.values.push({ x: obj.ts, y: obj.moisture });
  });

  temperature.values = temperature.values.slice(80, 145);
  humidity.values = humidity.values.slice(80, 145);
  moisture.values = moisture.values.slice(80, 145);

  return [temperature, humidity, moisture];
}
