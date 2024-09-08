const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const form = document.querySelector("#form");
const errorText = document.querySelector("#error-text");
const preloader = document.getElementById("preloader");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    await axios.post("/api/login", user);
    preloader.classList.add("flex", "justify-center", "items-center");
    preloader.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
    setTimeout(() => {
      preloader.classList.remove("flex", "justify-center", "items-center");
      preloader.innerHTML = ``;
    }, 5000);
    window.location.pathname = "/select-company";
  } catch (error) {
    console.log(error);
    errorText.innerHTML = error.response.data.error;
  }
});
