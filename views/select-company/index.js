const menu = document.getElementById("pre-index");
const btnRegistroEmpresa = document.getElementById("registrar-btn");

btnRegistroEmpresa.addEventListener("click", async (e) => {
  menu.innerHTML = `<form
        id="form-empresas"
        class="grid sm:grid-cols-1 md:gap-4 w-full bg-gray-400 rounded p-4 gap-3"
      >
        <div>
          <label
            for="nombre"
            class="block mb-1 text-sm font-medium text-gray-900"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div>
          <label for="rif" class="block mb-1 text-sm font-medium text-gray-900">
            Rif
          </label>
          <input
            id="rif"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div>
          <label
            for="telefono"
            class="block mb-1 text-sm font-medium text-gray-900"
          >
            Telefono
          </label>
          <input
            type="number"
            id="telefono"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div>
          <label
            for="direccion"
            class="block mb-1 text-sm font-medium text-gray-900"
          >
            Direccion
          </label>
          <input
            type="text"
            id="direccion"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div>
          <div>
            <label
              for="email"
              class="block mb-1 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>

          <div id="alerta"></div>
          <div class="flex w-2 mt-4">
            <button class="guardar-empresa text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Guardar
            </button>
          </div>
        </div>
      </form>`;

  const btnGuardarEmpresa = document.querySelector(".guardar-empresa");
  const formEmpresas = document.getElementById("form-empresas");
  if (btnGuardarEmpresa) {
    formEmpresas.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const rif = document.getElementById("rif").value;
      const telefono = document.getElementById("telefono").value;
      const direccion = document.getElementById("direccion").value;
      const email = document.getElementById("email").value;
      if (
        nombre === "" ||
        rif === "" ||
        telefono === "" ||
        direccion === "" ||
        email === ""
      ) {
        const alerta = document.getElementById("alerta");
        alerta.style.display = "block";
        alerta.innerHTML = `<div class="mt-2 flex justify-center w-full text-white text-center bg-red-600 rounded">Debes completar todos los campos</div>`;
        setTimeout(() => {
          alerta.innerHTML = ``;
          alerta.style.display = "";
        }, 5000);
        return;
      } else {
        const { data } = await axios.post("/api/empresas", {
          nombre,
          rif,
          telefono,
          direccion,
          email,
        });
        console.log({ data });
        formEmpresas.reset();
        menu.style.display = "block";
        menu.innerHTML = `<div class="flex justify-center w-full text-white text-center bg-green-400 rounded">Se han guardado los datos con exito</div>`;
        setTimeout(() => {
          menu.innerHTML = ``;
          menu.style.display = "";
        }, 5000);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const empresaSelect = document.getElementById("empresa-select");
  const continueBtn = document.getElementById("continue-btn");
  continueBtn.disabled = true;
  // const preIndex = document.getElementById("pre-index");
  // const mainContent = document.getElementById("main-content");
  let empresaId = "";

  // Fetch companies and populate the select menu
  try {
    const response = await axios.get("/api/empresas");
    const empresas = response.data;
    empresas.forEach((empresa) => {
      const option = document.createElement("option");
      option.value = empresa.id;
      option.textContent = empresa.nombre;
      empresaSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
  }

  // Handle continue button click
  empresaSelect.addEventListener("change", async () => {
    const principal = document.getElementById("principal");
    continueBtn.disabled = false;
    continueBtn.classList.remove("cursor-not-allowed");
    continueBtn.addEventListener("click", async (e) => {
      empresaId = empresaSelect.value;
      if (empresaId) {
        console.log(empresaId);
        principal.classList.add("flex", "justify-center", "items-center");
        principal.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
        setTimeout(() => {
          principal.classList.remove("flex", "justify-center", "items-center");
          principal.innerHTML = ``;
        }, 5000);
        window.location.href = `/dashboard2?empresaId=${empresaId}`;
      } else {
        alert("Porfavor selecciona una empresa");
      }
    });
  });
});
