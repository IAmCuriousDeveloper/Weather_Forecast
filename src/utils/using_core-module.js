//since our api is using the https protocol we will use the same for core module
//grab the https module
const https = require("https");
const url = `https://api.darksky.net/forecast/3dab1c3c75d89220bb8dc8be6ad01df1/37.8267,-122.4233?units=si`;

const request = https.request(url, response => {
  let data = "";
  response.on("data", chunk => {
    data = data + chunk.toString();
  });
  response.on("end", () => {
    const body = JSON.parse(data);
    //console.log(body);
  });
});
console.log(request);
request.end();
console.log(request);
//response.on() register a event ex-> when data is coming what to do ,when data coming ends what to do
//https.request returns an object with bunch of properties ,but we have to end it so that we can work with rest of the application
