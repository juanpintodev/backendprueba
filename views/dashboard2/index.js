const side = document.getElementById("side");
const div = document.querySelector("#div");
const titulo = document.querySelector("#titulo");
// const form = document.querySelector("#form");

side.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.closest(".libro-compras")) {
    titulo.innerHTML = `
    <h1 class="text-gray-800 text-center font-bold mb-4 text-2xl">Libro de Compras</h1>`;

    div.innerHTML = `
        <form id="form" class="flex w-full p-2 justify-around gap-4">
        <div class="mb-5">
            <label for="codigo" class="block mb-2 text-sm font-medium text-gray-900">Nº Cuenta</label>
            <input type="number" id="codigo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            />
        </div>
        <div class="mb-5">
            <label for="numero-factura" class="block mb-2 text-sm font-medium text-gray-900">Nº Factura</label>
            <input type="number" id="numero-factura" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div class="mb-5">
            <label for="fecha-factura" class="block mb-2 text-sm font-medium text-gray-900">Fecha Factura</label>
            <input type="date" id="fecha-factura" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div class="mb-5">
            <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900">Descripcion</label>
            <input type="text" id="descripcion" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div class="mb-5">
            <label for="base" class="block mb-2 text-sm font-medium text-gray-900">Base</label>
            <input type="number" id="base" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div class="mb-5">
            <label for="iva" class="block mb-2 text-sm font-medium text-gray-900">Iva</label>
            <input type="number" id="iva" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            
        <div class="flex w-2 mt-4">
            <button class="guardar-compras text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                dark:focus:ring-blue-800">Guardar</button>
            </div>
            </form>
         `;
    libros.innerHTML = `
    
     <div class="flex overflow-x-auto">

      <table id="tabla-compras" class="w-full text-sm text-left rtl:text-right rounded-md text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-900 uppercase dark:text-gray-800">
            <tr>
                <th scope="col" class="px-4 py-1">
                    Codigo cuenta
                </th>
                <th scope="col" class="px-4 py-1">
                    Nº Factura
                </th>
                <th scope="col" class="px-4 py-1">
                    Fecha Factura
                </th>
                <th scope="col" class="px-4 py-1">
                    Descripcion
                </th>
                <th scope="col" class="px-4 py-1">
                    Base Imponible
                </th>
                <th scope="col" class="px-4 py-1">
                    Iva
                </th>
                <th scope="col" class="px-4 py-1">
                    Total
                </th>
            </tr>
        </thead>
        <tbody class="text-gray-800 text-center contenteditable">
                </tbody>
            </table>
        </div>
        `;
  }

  const form = document.querySelector("#form");

  form.addEventListener("input", (e) => {
    e.preventDefault();
    const inputCodigo = document.querySelector("#codigo");
    const inputNumeroFactura = document.querySelector("#numero-factura");
    const inputFechaFactura = document.querySelector("#fecha-factura");
    const inputDescripcion = document.querySelector("#descripcion");
    const inputBase = document.querySelector("#base");
    const inputIva = document.querySelector("#iva");

    let code = inputCodigo.value;
    let nTicket = inputNumeroFactura.value;
    let fTicket = inputFechaFactura.value;
    let desc = inputDescripcion.value;
    let ba = inputBase.value;
    let iv = inputIva.value;

    console.log(code, nTicket, fTicket, desc, ba, iv);

    const btn = div.children[0].children[5].children[2].children[0];

    if (btn) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("ingreso al evento");
        const [{ datacompra }] = await axios.post("/api/registrocontable", {
          librocompra: [
            {
              codigo: code,
              numerofactura: nTicket,
              fechafactura: fTicket,
              descripcion: desc,
              base: ba,
              iva: iv,
            },
          ],
        });
        const tbody = document.querySelector("tbody");
        const nuevaFila = document.createElement("tr");
        nuevaFila.id = datacompra.id;
        nuevaFila.classList.add("flex", "flex-row");
        tbody.innerHTML = `
        <tr>
                  <th scope="col" class="px-4 py-1">
                      ${datacompra.codigo}
                  </th>
                  <th scope="col" class="px-4 py-1">
                      ${datacompra.numerofactura}
                  </th>
                  <th scope="col" class="px-4 py-1">
                      ${datacompra.fechafactura}
                  </th>
                  <th scope="col" class="px-4 py-1">
                      ${datacompra.descripcion}
                  </th>
                  <th scope="col" class="px-4 py-1">
                      ${datacompra.base}
                  </th>
                  <th scope="col" class="px-4 py-1">
                      ${datacompra.iva}
                  </th>
                  <th scope="col" class="px-4 py-1">
                  </th>
              </tr>`;
        // Append listItem
        tbody.append(nuevaFila);

        //vaciar campos
        inputCodigo.value = ``;
        inputNumeroFactura.value = ``;
        inputFechaFactura.value = ``;
        inputDescripcion.value = ``;
        inputBase.value = ``;
        inputIva.value = ``;
      });
    }
  });
});

// crea nueva fila
// inputCodigo.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(code);
// });
// inputNumeroFactura.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(nTicket);
// });
// inputFechaFactura.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(fTicket);
// });
// inputDescripcion.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(desc);
// });
// inputBase.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(ba);
// });
// inputIva.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(iv);
// });
