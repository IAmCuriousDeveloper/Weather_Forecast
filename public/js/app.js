console.log("javascript added");
const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");

console.log("weatherform", weatherForm);
console.log("messageone", messageOne);
console.log("messagetwo", messageTwo);

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  console.log(location);

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = `Right now it's ${data.forecast.summary}`;
        messageThree.textContent = `Temperature is : ${
          data.forecast.temperature
        } and probablity of Rain is : ${data.forecast.precipProbability}`;
        messageFour.textContent = ` Your Area fortune is : ${
          data.forecast.fortune
        }`;
      }
    });
  });
});

var input = document.querySelector(".search-form");
var search = document.querySelector("input");
var button = document.querySelector("button");
console.log("button", button);
console.log("search", search);
console.log("input", input);

button.addEventListener("click", function(e) {
  e.preventDefault();
  input.classList.toggle("active");
});
search.addEventListener("focus", function() {
  input.classList.add("focus");
});

search.addEventListener("blur", function() {
  search.value.length != 0
    ? input.classList.add("focus")
    : input.classList.remove("focus");
});
