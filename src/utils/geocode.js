const request = require("request");
function geocode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicHJhc2hhbnRwcjciLCJhIjoiY2p5ZmNwMXYyMDF6djNobzgxYzRqeXZscSJ9.yAWHHM4TwLo45VC05eCApA&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(
        "unable to connect to service please check your network connection",
        undefined
      );
    } else if (response.body.features === 0) {
      callback(`city not found check different location`, undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
}
module.exports = geocode;
