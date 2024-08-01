const navbar = document.querySelector("#navbar");

const createNavHome = () => {
  navbar.innerHTML = `
    <div
        class="max-w-7xl bg-gray-800 h-16 mx-auto flex items-center px-4 justify-between">
        <p class="font-bold text-md text-white">Logo</p>

        <!-- mobile version -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-12 md:hidden text-white cursor-pointer p-2 hover:bg-gray-600 rounded-lg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

      <!-- desktop version -->
      <div class="hidden md:flex gap-4">
      <a href="/login/" class="transition ease-in-out text-white font-bold hover:bg-gray-600 py-2 px-4 rounded-lg">login</a>
      <a href="/signup/" class="transition ease-in-out text-white font-bold bg-slate-400 hover:bg-slate-400 py-2 px-4 rounded-lg">Signup</a>
      </div>

      <!-- mobile menu -->
      <div class="bg-slate-800/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-5 hidden">
      <a href="/login/" class="transition ease-in-out text-white font-bold hover:bg-gray-600 py-2 px-4 rounded-lg">login</a>
      <a href="/signup/" class="transition ease-in-out text-black font-bold bg-slate-300 hover:bg-slate-400 py-2 px-4 rounded-lg">Signup</a>
      </div>
      </div>`;
};

const createNavSignup = () => {
  navbar.innerHTML = `
    <div
        class="max-w-7xl bg-gray-800 h-16 mx-auto flex items-center px-4 justify-between">
        <p class="font-bold text-md text-white">Logo</p>

        <!-- mobile version -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-12 md:hidden text-white cursor-pointer p-2 hover:bg-gray-600 rounded-lg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

      <!-- desktop version -->
      <div class="hidden md:flex gap-4">
      <a href="/login/" class="transition ease-in-out text-white font-bold hover:bg-gray-600 py-2 px-4 rounded-lg">login</a>
      </div>

      <!-- mobile menu -->
      <div class="bg-slate-800/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-5 hidden">
      <a href="/login/" class="transition ease-in-out text-white font-bold hover:bg-gary-600 py-2 px-4 rounded-lg">login</a>
      </div>
      </div>`;
};

const createNavLogin = () => {
  navbar.innerHTML = `
    <div
        class="max-w-7xl bg-gray-800 h-16 mx-auto flex items-center px-4 justify-between">
        <p class="font-bold text-md text-white">Logo</p>

        <!-- mobile version -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-12 md:hidden text-white cursor-pointer p-2 hover:bg-gray-600 rounded-lg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

      <!-- desktop version -->
      <div class="hidden md:flex gap-4">
      <a href="/signup/" class="transition ease-in-out text-white font-bold hover:bg-gray-600 py-2 px-4 rounded-lg">Registro</a>
      </div>

      <!-- mobile menu -->
      <div class="bg-slate-800/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-5 hidden">
      <a href="/signup/" class="transition ease-in-out text-white font-bold hover:bg-gray-600 py-2 px-4 rounded-lg">Regisro</a>
      </div>
      </div>`;
};

const createNavDashboard = () => {
  navbar.innerHTML = `
    <div
        class="max-w-7xl bg-teal-700 h-16 mx-auto flex items-center px-4 justify-between">
        <p class="font-bold text-md text-white">Logo</p>

        <!-- mobile version -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-12 md:hidden text-white cursor-pointer p-2 hover:bg-teal-800 rounded-lg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

      <!-- desktop version -->
      <div class="hidden md:flex gap-4">
      <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-teal-800 py-2 px-4 rounded-lg">Cerrar sesion</button>
      </div>

      <!-- mobile menu -->
      <div class="bg-slate-800/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-5 hidden">
      <button id="close-btn" class="transition ease-in-out text-white font-bold hover:bg-teal-800 py-2 px-4 rounded-lg">Cerrar sesion</button>
      </div>
      </div>`;
};

if (window.location.pathname === "/") {
  createNavHome();
} else if (window.location.pathname === "/signup/") {
  createNavSignup();
} else if (window.location.pathname === "/login/") {
  createNavLogin();
}

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener("click", (e) => {
  const menuMobile = navbar.children[0].children[3];

  if (!navBtn.classList.contains("active")) {
    navBtn.classList.add("active");
    menuMobile.classList.remove("hidden");
    menuMobile.classList.add("flex");
    navBtn.innerHTML = `
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6 18 18 6M6 6l12 12"
  />
  `;
  } else {
    navBtn.classList.remove("active");
    menuMobile.classList.add("hidden");
    menuMobile.classList.remove("flex");
    navBtn.innerHTML = `
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
    `;
  }
});

const closeBtnDesktop = navbar.children[0].children[2].children[0];
const closeBtnMobile = navbar.children[0].children[3].children[0];

closeBtnDesktop.addEventListener("click", async (e) => {
  try {
    await axios.get("/api/logout");
    window.location.pathname = "/login";
  } catch (error) {
    console.log(error);
  }
});

closeBtnMobile.addEventListener("click", async (e) => {
  try {
    await axios.get("/api/logout");
    window.location.pathname = "/login";
  } catch (error) {
    console.log(error);
  }
});
