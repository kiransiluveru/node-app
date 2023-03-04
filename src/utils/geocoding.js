const request = require("postman-request");

const getGeoCodingData = (place, callback) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=1&access_token=pk.eyJ1Ijoia2lycnUiLCJhIjoiY2xlcmNidHloMDBxMjNwbnRpMjZzenlveCJ9.L2In1loszo0WbuOU_tGw1g`;

  request({ url: URL, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect server");
      return;
    }
    if (response.statusCode === 404) {
      callback("Unable to connect server");

      return;
    }
    if (response.statusCode === 200 && body?.features?.length === 0) {
      callback("Unable to find location");
      return;
    }
    const data = {
      longitude: body?.features?.[0]?.center?.[0],
      latitude: body?.features?.[0]?.center?.[1],
      placeName: body?.features[0]?.place_name,
    };
    callback(undefined, data);
  });
};

module.exports = { getGeoCodingData };
