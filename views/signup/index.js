import { createNotification } from "../components/notification.js";

const form = document.querySelector("#form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const matchInput = document.querySelector("#match-input");
const formBtn = document.querySelector("#form-btn");
const notification = document.querySelector("#notification");

// Regex validations

const REGEX_VALIDATION_EMAIL =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REGEX_VALIDATION_PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[._!@#$&*?+-]).{8,}$/;
const REGEX_VALIDATION_NAME = /^[A-Z][a-zA-Z]+[ ]+(\s*[A-Z][a-zA-Z]*)$/;

// validation function
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

const validation = (input, regexValidation) => {
  formBtn.disabled =
    nameValidation && emailValidation && passwordValidation && matchValidation
      ? false
      : true;

  if (input.value === "") {
    input.classList.add("focus:outline-teal-700");
    input.classList.remove("outline-green-500");
    input.classList.remove("outline-red-500");
  } else if (regexValidation) {
    input.classList.remove("focus:outline-teal-700");
    input.classList.add("outline-green-500", "outline-2", "outline");
  } else {
    input.classList.remove("focus:outline-teal-700");
    input.classList.remove("outline-green-500");
    input.classList.add("outline-red-500", "outline-2", "outline");
  }
};

// Events
nameInput.addEventListener("input", (e) => {
  nameValidation = REGEX_VALIDATION_NAME.test(e.target.value);
  validation(nameInput, nameValidation);
});

emailInput.addEventListener("input", (e) => {
  emailValidation = REGEX_VALIDATION_EMAIL.test(e.target.value);
  validation(emailInput, emailValidation);
});

passwordInput.addEventListener("input", (e) => {
  passwordValidation = REGEX_VALIDATION_PASSWORD.test(e.target.value);
  matchValidation = e.target.value === matchInput.value;
  validation(passwordInput, passwordValidation);
  validation(matchInput, matchValidation);
});

matchInput.addEventListener("input", (e) => {
  matchValidation = e.target.value === passwordInput.value;
  validation(matchInput, matchValidation);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    const { data } = await axios.post("/api/users", newUser);
    createNotification(false, data);
    setTimeout(() => {
      notification.innerHTML = ``;
    }, 5000);

    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    matchInput.value = "";

    validation(nameInput, false);
    validation(emailInput, false);
    validation(passwordInput, false);
    validation(matchInput, false);
  } catch (error) {
    createNotification(true, error.response.data.error);
    setTimeout(() => {
      notification.innerHTML = ``;
    }, 5000);
  }
});
