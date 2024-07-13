const textInfo = document.querySelector("#text-info");
const bg = document.querySelector("#bg");

(async () => {
  try {
    const token = window.location.pathname.split("/")[3];
    const id = window.location.pathname.split("/")[2];
    await axios.patch(`/api/users/${id}/${token}`);
    window.location.pathname = "/login/";
  } catch (error) {
    textInfo.innerHTML = error.response.data.error;
    bg.classList.add("bg-red-600", "text-white");
  }
})();
