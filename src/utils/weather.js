const request = require("postman-request");

const getWeatherData = (latitude, longitude, callback) => {
  const URL = `http://api.weatherstack.com/current?access_key=6649abe5e64661f881313d92f9543437&query=${latitude},${longitude}`;

  request({ url: URL, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect server");
      return;
    }
    if (body.error) {
      callback(body.error?.info);
      return;
    }
    const data = {
      temperature: body?.current?.temperature,
      humidity: body?.current?.humidity,
    };
    callback(undefined, data);
  });
};

module.exports = { getWeatherData };
