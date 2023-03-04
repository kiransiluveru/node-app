console.log("Weather is loading");
const form = document.getElementById("addressForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitted");
  const loading = document.getElementById("loading");
  loading.textContent = "Fetching data...";
  const input = document.getElementById("placeInput");
  const messageElement = document.getElementById("message");
  const placenameElement = document.getElementById("placename");
  const value = input.value;
  if (value) {
    console.log("value", value);
    fetch(`http://localhost:3004/weather?place=${value}`).then(
      (success) => {
        loading.textContent = "";
        const response = success.json();
        response.then((data) => {
          console.log("success", data);
          if (data.message) {
            messageElement.textContent = data.message;
            placenameElement.textContent =""
          } else {
            console.log("placename", placenameElement, data.placeName);
            placenameElement.textContent = data.placeName;
            messageElement.textContent = "";

          }
        });
      },
      (error) => {
        loading.textContent = "";
        messageElement.textContent = "Something went wrong";
        console.log("failure", failure);
      }
    );
  }
});
