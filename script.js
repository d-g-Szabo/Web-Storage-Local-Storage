//variables, arrays, objects

const egg = {
  cookingMethods: ["boiled", "scrambled", "poached", "fried"],
  animalParent: ["chicken", "duck", "quail", "ostrich"],
  color: ["white", "brown", "eggshell", "blue", "yellow"],
  veganAlternative: "tofu",
};

console.log(egg);

// Step 1: Convert the object into a JSON string
const eggJSON = JSON.stringify(egg);

// Step 2: Store the JSON string in local storage
// setItem takes two arguments: a key and a value
localStorage.setItem("egg", eggJSON);

// Step 3: Retrieve the JSON string from local storage
// getItem takes one argument: the key
const retrievedEggJSON = localStorage.getItem("egg");
console.log(retrievedEggJSON);

// Step 4: Convert the JSON string back into an object
const parsedEgg = JSON.parse(retrievedEggJSON);
console.log(parsedEgg);

parsedEgg.color[0]; // "white"
parsedEgg.animalParent[3]; // "ostrich"

// cookie clicker help

// let counter = 0;
// localStorage.setItem("counter", counter);
// setInterval(() => {
//   counter++;
//   localStorage.setItem("counter", counter);
// }, 1000);

// localStorage.getItem("counter");

// workshop

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const colour = formData.get("colour");

  localStorage.setItem("colour", colour);
});

const colour = localStorage.getItem("colour");

if (colour) {
  const input = document.querySelector("input");
  input.value = colour;
}

function savePreferences(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const colour = formData.get("colour");
  const bgColor = formData.get("bgColor");
  const fontSize = formData.get("fontSize");

  // preferences is now an object, it might contain other preferences...
  const preferences = {
    colour,
    bgColor,
    fontSize,
  };

  // so when we save it, we stringify it
  localStorage.setItem("preferences", JSON.stringify(preferences));
  loadPreferences();
}

form.addEventListener("submit", savePreferences);

// then we parse the string back into an object when we retrieve it
const preferences = JSON.parse(localStorage.getItem("preferences"));

if (preferences) {
  const input = document.querySelector("input");
  input.value = preferences.colour;
}

function loadPreferences() {
  // load the prefs
  const preferences = JSON.parse(localStorage.getItem("preferences"));

  // if we have some prefs
  if (preferences) {
    // set the form textbox to write the user preference
    const colorInput = document.getElementById("text-color");
    const bcColorInput = document.getElementById("bg-color");
    const fontSizeInput = document.getElementById("font-size");

    colorInput.value = preferences.colour || "#000000"; // || is the "or" operator, it will use the value on the left if it's truthy, otherwise it will use the value on the right as a default value if colour isn't saved
    bcColorInput.value = preferences.bgColor || "#FFFFFF";
    fontSizeInput.value = preferences.fontSize || "1rem";

    // set the body color to the user colour preference (intentional US / UK spelling difference...)
    const body = document.querySelector("body");
    body.style.color = preferences.colour || "#000000";
    body.style.backgroundColor = preferences.bgColor || "#FFFFFF";
    body.style.fontSize = `${preferences.fontSize}rem` || "1rem";
  }
}

loadPreferences();

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", clearPreferences);

// clear preferences
function clearPreferences(event) {
  event.preventDefault();

  // clear the preferences
  localStorage.removeItem("preferences");
  // force reload the page
  location.reload();
}

// Function to handle changes in local storage
function handleLocalStorageChange(event) {
  console.log(JSON.parse(window.localStorage.getItem("sampleList")));

  if (event.key === "preferences") {
    // Do something when the specific local storage key changes
    const newValue = event.newValue;
    console.log(`Local storage favouriteColour changed to: ${newValue}`);
  }
}

// Add an event listener to listen for changes in local storage
window.addEventListener("storage", () => {
  handleLocalStorageChange;
});

window.onstorage = handleLocalStorageChange;
