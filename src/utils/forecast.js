const request = require("request");
function forecast(latitude, longitude, callback) {
  const url = `https://api.darksky.net/forecast/3dab1c3c75d89220bb8dc8be6ad01df1/${latitude},${longitude}?units=si`;

  const weatherbody = request({ url, json: true }, (error, Response) => {
    if (Response.body.code) {
      callback(Response.body.error, undefined);
    } else {
      callback(undefined, {
        summary: Response.body.currently.summary,
        fortune: Response.body.daily.summary,
        temperature: Response.body.currently.temperature,
        humidity: Response.body.currently.humidity,
        precipProbability: Response.body.currently.precipProbability
      });
    }
  });
}

module.exports = forecast;

// const jsonData = request({ url: url, json: true }, (error, response) => {
//   if (error) {
//   } else if (response.body.code) {
//     console.log(response.body.error);
//   } else {
//     console.log(response.body.currently);
//   }
// });
