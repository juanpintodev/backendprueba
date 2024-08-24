const side = document.getElementById("side");
const div = document.querySelector("#div");
const titulo = document.querySelector("#titulo");
const libros = document.getElementById("libros");
let empresaId = "";
let libroCompras = [];
let proveedorSelec = null;
let selecCuentas = null;

side.addEventListener("click", async (e) => {
  e.preventDefault();
  (async () => {
    const empresa = await axios.get(`/api/empresas`);
    const { data } = empresa;
    empresaId = data.id;
    console.log(empresaId);
  })();
  if (e.target.closest(".libro-compras")) {
    titulo.innerHTML = `
    <h1 class="text-gray-800 text-center font-bold mb-1 text-2xl">Libro de Compras</h1>
    
    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    </svg>
    </div>
    <form id="bucar-proveedor" class="w-full">   
    <label for="proveedor" class="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <select id="proveedor" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
        <option>Elegir Proveedor</option>
        </select>
        </div>
        </form>
                    `;

    div.innerHTML = `
        <form id="form" class="mt-1 grid sm:grid-cols-3 pt-1 pb-1 md:gap-4 w-full bg-gray-400 rounded p-4 gap-3">
        <div>
            <label for="fecha" class="block mb-1 text-sm font-medium text-gray-900">Fecha</label>
            <input type="date" id="fecha" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
            <div>
            <label for="rif" class="block mb-1 text-sm font-medium text-gray-900">Rif</label>
            <input id="rif" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div>
            <label for="documento" class="block mb-1 text-sm font-medium text-gray-900">Documento</label>
             <select id="documento" class="bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option selected>Elegir opcion</option>
             <option value="factura">Factura</option>
             <option value="nota-entrega">Nota de entrega</option>
             <option value="nota-debito">Nota de debito</option>
             <option value=nota-credito">Nota de credito</option>
             <option value="certificaciones">Certificaciones</option>
            </select>
        </div>
        <div>
            <label for="numerodocumento" class="block mb-1 text-sm font-medium text-gray-900">Nº Documento</label>
            <input type="number" id="numerodocumento" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div>
            <label for="numerocontrol" class="block mb-1 text-sm font-medium text-gray-900">Nº Control</label>
            <input type="number" id="numerocontrol" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
            <div>
            <label for="descripcion" class="block mb-1 text-sm font-medium text-gray-900">Descripcion</label>
            <input type="text" id="descripcion" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div>
            <label for="tipocompra" class="block mb-1 text-sm font-medium text-gray-900">Tipo de compra</label>
            <select id="tipocompra" class="bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option selected>Elegir opcion</option>
             <option value="exentas">Exentas</option>
             <option value="importacion">Importacion</option>
             <option value="internas">Internas</option>
             <option value="exoneradas">Exoneradas</option>
             <option value="nosujetas">No sujetas</option>
             <option value="sincredito">Sin derecho a credito</option>
            </select>
            </div>
            <div>
            <label for="transaccion" class="block mb-1 text-sm font-medium text-gray-900">Tipo de transaccion</label>
         <select id="transaccion" class="bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500">
         <option selected>Elegir opcion</option>
         <option value="registro">Registro</option>
         <option value="complemento">Complemento</option>
         <option value="anulacion">Anulacion</option>
         <option value="ajuste">Ajuste</option>
        </select>
        </div>
        <div>
        <label for="creditofiscal" class="block mb-1 text-sm font-medium text-gray-900">Credito fiscal</label>
         <select id="creditofiscal" class="bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500">
         <option selected>Elegir opcion</option>
         <option value="deducible">Deducible</option>
         <option value="prorrateable">Prorrateable</option>
         <option value="nodeducible">No deducible</option>
        </select>
        </div>
            <div>
            <label for="exento" class="block mb-1 text-sm font-medium text-gray-900">Exento</label>
            <input type="number" id="exento" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            />
            </div>
            <div>
            <label for="iva" class="block mb-1 text-sm font-medium text-gray-900">Iva</label>
            <select id="iva" class="bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option selected>Elegir opcion</option>
             <option value="8">8%</option>
             <option value="16">16%</option>
             <option value="31">31%</option>
             </select>
            </div>
            <div>
            <label for="base" class="block mb-1 text-sm font-medium text-gray-900">Base</label>
            <input type="number" id="base" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div>
            <label for="comprobanteretencion" class="block mb-1 text-sm font-medium text-gray-900">Nº comprobante retencion</label>
            <input type="number" id="comprobanteretencion" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            />
            </div>
            <div>
            <label for="retencion" class="block mb-1 text-sm font-medium text-gray-900">Retencion %</label>
            <input type="number" id="retencion" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            />
            </div>
            <div class="flex w-2 mt-4">
                <button class="guardar-compras text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                    dark:focus:ring-blue-800">Guardar</button>
                </div>

            </form>
         `;
    libros.classList.add("flex", "flex-col");
    libros.innerHTML = `
    
     <div class="flex h-36 overflow-x-auto overflow-y-auto items-start w-full rounded bg-gray-400">

      <table id="tabla-compras" class="w-full mb-1 text-sm text-left rtl:text-right rounded-md text-gray-300 dark:text-gray-400">
        <thead class="text-xs text-gray-900 uppercase dark:text-gray-800">
            <tr>
                <th scope="col" class="px-4 py-1">
                    Fecha
                </th>
                <th scope="col" class="px-4 py-1">
                    Rif
                </th>
                <th scope="col" class="px-4 py-1">
                    Proveedor
                </th>
                <th scope="col" class="px-4 py-1">
                    Nº Documento
                </th>
                <th scope="col" class="px-4 py-1">
                    Documento
                </th>
                <th scope="col" class="px-4 py-1">
                    Nº Control
                </th>
                <th scope="col" class="px-4 py-1">
                    Descripcion
                </th>
                <th scope="col" class="px-4 py-1">
                    Tipo de Compra
                </th>
                <th scope="col" class="px-4 py-1">
                    Tipo de transaccion
                </th>
                <th scope="col" class="px-4 py-1">
                    Credito fiscal
                </th>
                <th scope="col" class="px-4 py-1">
                    Exento
                </th>
                <th scope="col" class="px-4 py-1">
                    Iva
                </th>
                <th scope="col" class="px-4 py-1">
                    Base
                </th>
                <th scope="col" class="px-4 py-1">
                    Nº Retencion
                </th>
                <th scope="col" class="px-4 py-1">
                    Iva Retenido
                </th>
                <th scope="col" class="px-4 py-1">
                    Total
                </th>
            </tr>
        </thead>
        <tbody class="text-gray-600 text-center bg-gray-300">
                </tbody>
            </table>
        </div>
        <form id="form-asientos" class="flex p-2">
                <div class="sticky mt-1 bottom-0 left-0 z-50 w-full h-10 border-gray-200 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
            <button type="button" id="asiento-compra" class="inline-flex rounded flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                <svg class="w-4 h-4 mb-1 text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
                <span class="text-sm text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">Asiento</span>
            </button>
            <button type="button" class="inline-flex rounded flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mb-1 text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                <span class="text-sm text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">Editar</span>
            </button>
            <button type="button" id="eliminar" class="inline-flex rounded flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mb-1 text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">Eliminar</span>
            </button>
        </div>
        </form>
        `;

    let proveedorNombre = ``;
    let proveedorRetencion = 0;
    let proveedorRif = ``;

    const selectProveedor = document.getElementById("proveedor");
    // Limpiar el select antes de agregar nuevas opciones
    selectProveedor.innerHTML = "";
    const proveedor = await axios.get(`/api/proveedores`);
    const { data } = proveedor;

    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // O cualquier otro valor que quieras asignar
    defaultOption.textContent = "Elegir Proveedor";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectProveedor.appendChild(defaultOption);

    // Crear opciones para cada elemento de los datos
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id; // O cualquier otro valor que quieras asignar
      option.textContent = item.nombre; // Reemplaza 'nombre' por el campo que quieres mostrar
      selectProveedor.appendChild(option);
    });

    selectProveedor.addEventListener("input", async (e) => {
      proveedorSelec = data.find(
        (proveedor) => proveedor.id === selectProveedor.value
      );
      const retencion = document.getElementById("retencion");
      retencion.value = proveedorSelec.retencioniva;
      const rif = document.getElementById("rif");
      rif.value = proveedorSelec.rif;
    });

    const form = document.querySelector("#form");
    const btnlibrocompra = div.children[0].children[14].children[0];
    if (btnlibrocompra) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
          // const formData = new FormData(form);
          const fecha = document.getElementById("fecha").value;
          const documento = document.getElementById("documento").value;
          const numerodocumento =
            document.getElementById("numerodocumento").value;
          const numerocontrol = document.getElementById("numerocontrol").value;
          const proveedor = document.getElementById("proveedor").value;
          const descripcion = document.getElementById("descripcion").value;
          const tipocompra = document.getElementById("tipocompra").value;
          const transaccion = document.getElementById("transaccion").value;
          const creditofiscal = document.getElementById("creditofiscal").value;
          const exento = document.getElementById("exento").value;
          const base = document.getElementById("base").value;
          const iva = document.getElementById("iva").value;
          const numeroretencion = document.getElementById(
            "comprobanteretencion"
          ).value;
          let retencion = document.getElementById("retencion");
          retencion.value = proveedorSelec.retencion;
          const { data } = await axios.post("/api/librocompras", {
            fecha,
            rif: proveedorSelec.rif,
            numerodocumento,
            documento,
            numerocontrol,
            proveedor: proveedorSelec.nombre,
            descripcion,
            tipocompra,
            transaccion,
            creditofiscal,
            exento,
            base,
            iva,
            numeroretencion,
            retencion: proveedorSelec.retencioniva,
            empresaId,
          });
          const fechaSplit = data.fecha.split("T")[0];
          const calculoIva = (data.iva * data.base) / 100;
          const calculoTotal = calculoIva + data.base + data.exento;
          const calculoRetencion =
            (proveedorSelec.retencioniva * calculoIva) / 100;
          const tbody = document.querySelector("tbody");
          const nuevaFila = document.createElement("tr");
          nuevaFila.id = data.id;
          //   nuevaFila.classList.add("flex", "flex-row");
          nuevaFila.innerHTML = `
                        <th scope="col" class="w-32 text-gray-800 font-medium px-4 py-1">
                            ${fechaSplit}
                        </th>
                        <th scope="col" class="w-32 text-gray-800 font-medium px-4 py-1">
                            ${data.rif}
                        </th>
                        <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                            ${data.numerodocumento}
                        </th>
                        <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                            ${data.documento}
                        </th>
                        <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                            ${data.numerocontrol}
                        </th>
                        <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                            ${data.proveedor}
                        </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${data.descripcion}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${data.tipocompra}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${data.transaccion}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${data.creditofiscal}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${data.exento}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${calculoIva}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${data.base}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${data.numeroretencion}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${calculoRetencion}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${calculoTotal}
                          </th>
                      `;
          // Append listItem
          tbody.appendChild(nuevaFila);
          // console.log(`tr`);
          form.reset();
        } catch (error) {
          console.log(error);
        }
      });
    }

    (async () => {
      try {
        const { data } = await axios.get("/api/librocompras");
        data.forEach((compra) => {
          const fechaSplit = compra.fecha.split("T")[0];
          const calculoIva = (compra.iva * compra.base) / 100;
          const calculoTotal = calculoIva + compra.base + compra.exento;
          const calculoRetencion = (compra.retencion * calculoIva) / 100;
          const tbody = document.querySelector("tbody");
          const nuevaFila = document.createElement("tr");
          //   nuevaFila.classList.add("flex", "flex-row");
          nuevaFila.id = compra.id;
          nuevaFila.innerHTML = `
                        <th scope="col" class=" w-32 text-gray-800 font-medium px-4 py-1">
                            ${fechaSplit}
                        </th>
                        <th scope="col" class=" w-32 text-gray-800 font-medium px-4 py-1">
                            ${compra.rif}
                        </th>
                        <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                            ${compra.numerodocumento}
                        </th>
                        <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                            ${compra.documento}
                        </th>
                        <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                            ${compra.numerocontrol}
                        </th>
                        <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                            ${compra.proveedor}
                        </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${compra.descripcion}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${compra.tipocompra}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${compra.transaccion}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${compra.creditofiscal}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${compra.exento}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${calculoIva}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${compra.base}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${compra.numeroretencion}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${calculoRetencion}
                          </th>
                          <th scope="col" class="text-gray-800 font-medium px-4 py-1">
                              ${calculoTotal}
                          </th>
                        `;
          // Append listItem
          tbody.appendChild(nuevaFila);
        });
      } catch (error) {
        console.log(error);
      }
    })();

    // const btnEliminar = document.getElementById("eliminar");
    // btnEliminar.addEventListener("click", async (e) => {
    // console.log(btnEliminar);
    // });
    // const formasientos = document.getElementById("form-asientos");
    const btnasiento = document.getElementById("asiento-compra");
    btnasiento.addEventListener("click", async (e) => {
      const { data } = await axios.get("/api/librocompras");

      let totalDebe = 0;
      let totalHaber = 0;
      let totalIva = 0;
      let debeCompras = 0;
      let haberCompras = 0;

      data.forEach((dato) => {
        // console.log(dato);
        const calculoIva = (dato.iva * dato.base) / 100;
        haberCompras = (dato.retencion * calculoIva) / 100;
        debeCompras = dato.base + dato.exento;

        totalIva += calculoIva;
        totalDebe += debeCompras;
        totalHaber += haberCompras;
      });

      // console.log(totalIva);
      // console.log(totalDebe);
      // console.log(totalHaber);

      let cero = 0;

      titulo.innerHTML = `
      <h1 class="text-gray-800 text-center font-bold mb-1 text-2xl">Asientos</h1>`;
      div.innerHTML = `
      <form id="form-asiento" class="container mx-auto w-full bg-gray-300 rounded overflow-y-auto" style="max-height: 50vw"> 
                    <table id="table-asientos" class="table-auto w-full">
                    <thead>
                    <tr>
                        <th class="px-4 py-2 text-center w-18">Asiento Nº<input id="numeroasiento" class="text-center bg-gray-300 w-10" value="000"></th>
                        <th class="flex px-4 py-2 text-center">Fecha:<input type="date" id="fecha-asiento" class="shadow-sm w-32 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-300 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/></th>
                        <tr>
                        <th class="px-1 py-1">Cuenta</th>
                        <th class="px-4 py-2">Concepto</th>
                        <th class="px-4 py-2 text-center">Debe</th>
                        <th class="px-4 py-2 text-center">Haber</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td id="codigo1" class="px-2 py-2 text-center">...</td>
                    <td class="px-2 py-2 text-center botom"><select id="selec-cuenta1" class="cursor-pointer text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md 
                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-300 
                    dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </select></td>
                    <td class="pl-10 py-2 "><input class="bg-gray-200 rounded text-center" id="inputCompraDebe" type="number"></td>
                    <td class="pl-10 py-2 "><input class="bg-gray-200 rounded text-center" id="inputCompraHaber" type="number"></td>
                    </tr>
                    <td id="codigo2" class="px-2 py-2 text-center">...</td>
                    <td class="px-2 py-2 text-center"><select id="selec-cuenta2" class="cursor-pointer text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md 
                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-300 
                    dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </select></td>
                    <td class="pl-10 py-2 "><input class="bg-gray-200 rounded text-center" id="inputCreditoDebe" type="number"></td>
                    <td class="pl-10 py-2 "><input class="bg-gray-200 rounded text-center" id="inputCreditoHaber" type="number"></td>
                    </tr>
                    <td id="codigo3" class="px-2 py-2 text-center">...</td>
                    <td class="px-2 py-2 text-center"><select id="selec-cuenta3" class="cursor-pointer text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md 
                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-300 
                    dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                    </select></td>
                    <td class="pl-10 py-2 "><input class="bg-gray-200 rounded text-center" id="inputRetenidoDebe" type="number"></td>
                    <td class="pl-10 py-2 text-center"><input class="bg-gray-200 rounded text-center" id="inputRetenidoHaber" type="number"></td>
                    </tr>
                        </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                        <th class="text-right">Totales</th>
                        <th id="totalAsientoDebe" class="pl-8 text-center">${
                          totalDebe + totalIva
                        }</th>
                        <th id="totalAsientoHaber" class="pl-8 text-center">${totalHaber}</th>
                        </tr>
                    </tfoot>
                    </table>
                    <div id="notification"></div>
                </form>`;

      (async () => {
        const cuentas = await axios.get("/api/cuentas");
        const { data } = cuentas;

        const selectCuenta1 = document.getElementById("selec-cuenta1");
        const selectCuenta2 = document.getElementById("selec-cuenta2");
        const selectCuenta3 = document.getElementById("selec-cuenta3");
        const defaultOption1 = document.createElement("option");
        defaultOption1.value = ""; // O cualquier otro valor que quieras asignar
        defaultOption1.textContent = "Elegir Cuenta";
        defaultOption1.selected = true;
        defaultOption1.disabled = true;
        selectCuenta1.appendChild(defaultOption1);
        const defaultOption2 = document.createElement("option");
        defaultOption2.value = ""; // O cualquier otro valor que quieras asignar
        defaultOption2.textContent = "Elegir Cuenta";
        defaultOption2.selected = true;
        defaultOption2.disabled = true;
        selectCuenta2.appendChild(defaultOption2);
        const defaultOption3 = document.createElement("option");
        defaultOption3.value = ""; // O cualquier otro valor que quieras asignar
        defaultOption3.textContent = "Elegir Cuenta";
        defaultOption3.selected = true;
        defaultOption3.disabled = true;
        selectCuenta3.appendChild(defaultOption3);
        // Crear opciones para cada elemento de los datos
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.nombre; // O cualquier otro valor que quieras asignar
          option.innerText = item.nombre; // Reemplaza 'nombre' por el campo que quieres mostrar
          selectCuenta1.appendChild(option);
          selectCuenta1.addEventListener("input", async (e) => {
            selecCuentas = data.find(
              (cuentas) => cuentas.nombre === selectCuenta1.value
            );
            const codigo = document.getElementById("codigo1");
            codigo.innerText = selecCuentas.codigo;
            codigo.value = selecCuentas.codigo;
          });
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.nombre; // O cualquier otro valor que quieras asignar
            option.innerText = item.nombre; // Reemplaza 'nombre' por el campo que quieres mostrar
            selectCuenta2.appendChild(option);
            selectCuenta2.addEventListener("input", async (e) => {
              selecCuentas = data.find(
                (cuentas) => cuentas.nombre === selectCuenta2.value
              );
              const codigo = document.getElementById("codigo2");
              codigo.innerText = selecCuentas.codigo;
              codigo.value = selecCuentas.codigo;
            });
          });
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.nombre; // O cualquier otro valor que quieras asignar
            option.innerText = item.nombre; // Reemplaza 'nombre' por el campo que quieres mostrar
            selectCuenta3.appendChild(option);
            selectCuenta3.addEventListener("input", async (e) => {
              selecCuentas = data.find(
                (cuentas) => cuentas.nombre === selectCuenta3.value
              );
              const codigo = document.getElementById("codigo3");
              codigo.innerText = selecCuentas.codigo;
              codigo.value = selecCuentas.codigo;
            });
          });
        });
      })();

      const compraDebe = document.getElementById("inputCompraDebe");
      const compraHaber = document.getElementById("inputCompraHaber");
      const creditoDebe = document.getElementById("inputCreditoDebe");
      const creditoHaber = document.getElementById("inputCreditoHaber");
      const retenidoDebe = document.getElementById("inputRetenidoDebe");
      const retenidoHaber = document.getElementById("inputRetenidoHaber");

      compraDebe.value = totalDebe;
      compraHaber.value = cero;
      creditoDebe.value = totalIva;
      creditoHaber.value = cero;
      retenidoDebe.value = cero;
      retenidoHaber.value = totalHaber;

      //   const totalDebeElement = document.getElementById("totalDebe");
      //   const totalHaberElement = document.getElementById("totalHaber");

      libros.innerHTML = `
    
      <form id="asientos" class="bottom-0 p-2">
                <div class="sticky mt-1 bottom-0 left-0 z-50 w-full h-10 border-gray-200 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
            <button type="button" id="asiento-compra" class="inline-flex rounded flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                <svg class="w-4 h-4 mb-1 text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
                <span class="text-sm text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">Asiento</span>
                <button id="conciliar" type="button" class="inline-flex rounded flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                    class="w-4 h-4 mb-1 text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">
                    <path fill-rule="evenodd" d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Zm9 9a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.25Z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">Conciliar</span>
                </button>
            </button>
                <button id="guardar-asiento" type="button" disabled:true class="inline-flex rounded cursor-not-allowed flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mb-1 text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                <path fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
              </svg>

                <span class="text-sm text-gray-800 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-gray-200">Guardar</span>
            </button>
        </div>
        </form>
        `;

      const tbodyConciliar = document.querySelector("tbody");
      const btnConciliar = document.getElementById("conciliar");
      btnConciliar.addEventListener("click", async (e) => {
        const cuentas = await axios.get("/api/cuentas");
        const { data } = cuentas;

        const nuevaCelda = document.createElement("tr");
        nuevaCelda.innerHTML = `                    
        <td class="codigo px-1 py-2 text-center">...</td>
        <td class="px-1 py-2 text-center" contenteditable=true>
          <select class="concepto selec-cuenta cursor-pointer text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md 
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-300 
          dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
          </select>
        </td>
        <td class="debe pl-10 py-2 text-center"><input contenteditable=true class="bg-gray-200 rounded text-center"></td>
        <td class="haber pl-10 py-2 text-center"><input contenteditable=true class="bg-gray-200 rounded text-center" type="number"></td>
      `;
        tbodyConciliar.appendChild(nuevaCelda);

        const selectCuenta = nuevaCelda.querySelector(".selec-cuenta");
        // Crear opciones para cada elemento de los datos
        const defaultOption = document.createElement("option");
        defaultOption.value = ""; // O cualquier otro valor que quieras asignar
        defaultOption.textContent = "Elegir Cuenta";
        defaultOption.selected = true;
        defaultOption.disabled = true;
        selectCuenta.appendChild(defaultOption);
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.nombre; // O cualquier otro valor que quieras asignar
          option.innerText = item.nombre; // Reemplaza 'nombre' por el campo que quieres mostrar
          selectCuenta.appendChild(option);
        });

        selectCuenta.addEventListener("input", async (e) => {
          selecCuentas = data.find(
            (cuentas) => cuentas.nombre === selectCuenta.value
          );
          const codigo = nuevaCelda.querySelector(".codigo");
          codigo.innerText = selecCuentas.codigo;
        });
      });

      const form = document.getElementById("form-asiento");
      form.addEventListener("input", async (e) => {
        const valoresDebe = document.querySelectorAll("td:nth-child(3) input");
        const valoresHaber = document.querySelectorAll("td:nth-child(4) input");
        const totalGeneralDebe = document.getElementById("totalAsientoDebe");
        const totalGeneralHaber = document.getElementById("totalAsientoHaber");
        const notificacion = document.getElementById("notification");
        let totalAsientoDebe = 0;
        let totalAsientoHaber = 0;

        valoresDebe.forEach((input) => {
          totalAsientoDebe += parseFloat(input.value) || 0;
        });

        valoresHaber.forEach((input) => {
          totalAsientoHaber += parseFloat(input.value) || 0;
        });

        console.log(totalAsientoDebe.toFixed(2), totalAsientoHaber.toFixed(2));

        totalGeneralDebe.innerHTML = `${totalAsientoDebe.toFixed(2)}`;
        totalGeneralHaber.innerHTML = `${totalAsientoHaber.toFixed(2)}`;

        if (totalAsientoHaber != totalAsientoDebe) {
          const btnGuardarAsiento = document.getElementById("guardar-asiento");
          btnGuardarAsiento.classList.add("cursor-not-allowed");
          btnGuardarAsiento.disabled = true;
          totalGeneralHaber.classList.remove(
            "border",
            "border-green-500",
            "border-4", // Espesor del borde
            "rounded-lg"
          );
          totalGeneralHaber.classList.add(
            "border",
            "border-red-500",
            "border-4", // Espesor del borde
            "rounded-lg"
          );
          notificacion.classList.remove(
            "text-white",
            "text-center",
            "bg-green-400",
            "rounded"
          );
          notificacion.classList.add(
            "text-white",
            "text-center",
            "bg-red-400",
            "rounded"
          );
          notificacion.innerHTML = `El Total Debe y Haber no coindide`;
        } else {
          const btnGuardarAsiento = document.getElementById("guardar-asiento");
          btnGuardarAsiento.classList.remove("cursor-not-allowed");
          btnGuardarAsiento.disabled = false;
          totalGeneralHaber.classList.remove(
            "border",
            "border-red-500",
            "border-4", // Espesor del borde
            "rounded-lg"
          );
          totalGeneralHaber.classList.add(
            "border",
            "border-green-500",
            "border-4", // Espesor del borde
            "rounded-lg"
          );
          notificacion.innerHTML = `Haz cociliado correctamente los totales`;
          notificacion.classList.remove(
            "text-white",
            "text-center",
            "bg-red-400",
            "rounded"
          );
          notificacion.classList.add(
            "text-white",
            "text-center",
            "bg-green-400",
            "rounded"
          );

          setTimeout(() => {
            notificacion.innerHTML = "";
            notificacion.classList.remove(
              "text-white",
              "text-center",
              "bg-red-400",
              "bg-green-400",
              "rounded"
            );
            totalGeneralHaber.classList.remove(
              "border",
              "border-green-500",
              "border-4", // Espesor del borde
              "rounded-lg"
            );
          }, 5000);
        }
      });

      const btnGuardarAsiento = document.getElementById("guardar-asiento");
      const numeroAsientoInput = document.getElementById("numeroasiento");
      // Convertir el valor inicial a número
      let numeroAsiento = parseInt(numeroAsientoInput.value, 10);
      btnGuardarAsiento.addEventListener("click", async (e) => {
        // Actualizar el valor del input
        numeroAsientoInput.value = numeroAsiento.toString().padStart(3, "0");
        // Incrementar el número de asiento
        numeroAsiento += 1;

        const fechaAsiento = document
          .getElementById("fecha-asiento")
          .value.split("T")[0];
        // Suponiendo que la tabla tiene un ID "tablaAsientos"
        const filas = form.querySelectorAll("tbody tr");
        const asientos = [];
        let totalDe = 0;
        let totalHa = 0;

        filas.forEach((fila) => {
          const celdas = fila.querySelectorAll("td");
          const cuenta = celdas[0].textContent.trim();
          const concepto = celdas[1].querySelector("select")
            ? celdas[1].querySelector("select").value.trim()
            : "";
          const debe = celdas[2].querySelector("input")
            ? parseFloat(celdas[2].querySelector("input").value)
            : 0;
          const haber = celdas[3].querySelector("input")
            ? parseFloat(celdas[3].querySelector("input").value)
            : 0;

          const asiento = {
            cuenta: cuenta,
            concepto: concepto,
            debe: isNaN(debe) ? 0 : debe,
            haber: isNaN(haber) ? 0 : haber,
          };
          totalDe += asiento.debe;
          totalHa += asiento.haber;
          asientos.push(asiento);
        });

        // Ejemplo de uso:
        console.log(asientos);
        try {
          const { data } = await axios.post("/api/asientos", {
            numeroAsiento,
            items: asientos,
            fechaAsiento,
            totalDe,
            totalHa,
            empresaId,
          });
          console.log({ data });
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  if (e.target.closest(".clientes")) {
    libros.innerHTML = ``;
    titulo.innerHTML = `
    <h1 class="text-gray-800 text-center font-bold mt-4 mb-2 text-2xl">Registro de Clientes</h1>`;
    div.classList.add("w-full");
    div.innerHTML = `
        <form id="form-cliente" class="grid sm:grid-cols-1 md:gap-4 w-6/12 bg-gray-400 rounded p-4 gap-3">
        <div>
            <label for="nombre" class="block mb-1 text-sm font-medium text-gray-900">Nombre</label>
            <input type="text" id="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div>
            <label for="rif" class="block mb-1 text-sm font-medium text-gray-900">Rif</label>
            <input id="rif" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div>
                <label for="telefono" class="block mb-1 text-sm font-medium text-gray-900">Telefono</label>
                <input type="number" id="telefono" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div>
            <label for="direccion" class="block mb-1 text-sm font-medium text-gray-900">Direccion</label>
            <input type="text" id="direccion" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
        <div>
            <div>
            <label for="email" class="block mb-1 text-sm font-medium text-gray-900">Email</label>
            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            />
            </div>
            <div class="flex w-2 mt-4">
                <button class="guardar-proveedor text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                    dark:focus:ring-blue-800">Guardar</button>
                </div>
            </div>
            </form>
            `;
    const formcliente = document.querySelector("#form-cliente");
    const guardarcliente = div.children[0].children[4].children[1].children[0];
    if (guardarcliente) {
      formcliente.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const nombre = document.getElementById("nombre").value;
          const rif = document.getElementById("rif").value;
          const telefono = document.getElementById("telefono").value;
          const direccion = document.getElementById("direccion").value;
          const email = document.getElementById("email").value;
          const { data } = await axios.post("/api/clientes", {
            nombre,
            rif,
            telefono,
            direccion,
            email,
            empresaId,
          });
          console.log({ data });
        } catch (error) {
          console.log(error);
        }
        formcliente.reset();
      });
    }
  }

  if (e.target.closest(".proveedores")) {
    libros.innerHTML = ``;
    titulo.innerHTML = `
    <h1 class="text-gray-800 text-center font-bold mt-4 mb-2 text-2xl">Registro de Proveedor</h1>`;
    div.classList.add("w-full");
    div.innerHTML = `
        <form id="form-proveedor" class="grid sm:grid-cols-1 w-6/12 bg-gray-400 rounded md:gap-4 p-4 gap-3">
        <div>
            <label for="nombre" class="block mb-1 text-sm font-medium text-gray-900">Nombre</label>
            <input type="text" id="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div>
            <label for="rif" class="block mb-1 text-sm font-medium text-gray-900">Rif</label>
            <input id="rif" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div>
                <label for="telefono" class="block mb-1 text-sm font-medium text-gray-900">Telefono</label>
                <input type="number" id="telefono" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div>
            <label for="direccion" class="block mb-1 text-sm font-medium text-gray-900">Direccion</label>
            <input type="text" id="direccion" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
        <div>
            <div>
            <label for="email" class="block mb-1 text-sm font-medium text-gray-900">Email</label>
            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            />
            </div>
            </div>
            <div>
            <label for="retencioniva" class="block mb-1 text-sm font-medium text-gray-900">Retencion iva</label>
            <select id="retencioniva" class="bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option selected>Elegir opcion</option>
             <option value="75">75%</option>
             <option value="100">100%</option>
            </select>
            <div class="flex w-2 mt-4">
                <button class="guardar-proveedor text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                    dark:focus:ring-blue-800">Guardar</button>
                </div>
            </div>
            </form>
            `;

    const formproveedor = document.querySelector("#form-proveedor");
    const guardarproveedor =
      div.children[0].children[5].children[2].children[0];
    if (guardarproveedor) {
      formproveedor.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const nombre = document.getElementById("nombre").value;
          const rif = document.getElementById("rif").value;
          const telefono = document.getElementById("telefono").value;
          const direccion = document.getElementById("direccion").value;
          const email = document.getElementById("email").value;
          const retencioniva = document.getElementById("retencioniva").value;
          const { data } = await axios.post("/api/proveedores", {
            nombre,
            rif,
            telefono,
            direccion,
            email,
            retencioniva,
            empresaId,
          });
          console.log({ data });
        } catch (error) {
          console.log(error);
        }
        formproveedor.reset();
      });
    }
  }

  if (e.target.closest(".empresas")) {
    libros.innerHTML = ``;
    titulo.innerHTML = `
    <h1 class="text-gray-800 text-center font-bold mt-4 mb-2 text-2xl">Registro de Empresas</h1>`;
    div.classList.add("w-full");
    div.innerHTML = `
        <form id="form-empresas" class="grid sm:grid-cols-1 md:gap-4 w-6/12 bg-gray-400 rounded p-4 gap-3">
        <div>
            <label for="nombre" class="block mb-1 text-sm font-medium text-gray-900">Nombre</label>
            <input type="text" id="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div>
            <label for="rif" class="block mb-1 text-sm font-medium text-gray-900">Rif</label>
            <input id="rif" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div>
                <label for="telefono" class="block mb-1 text-sm font-medium text-gray-900">Telefono</label>
                <input type="number" id="telefono" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div>
            <label for="direccion" class="block mb-1 text-sm font-medium text-gray-900">Direccion</label>
            <input type="text" id="direccion" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
        <div>
            <div>
            <label for="email" class="block mb-1 text-sm font-medium text-gray-900">Email</label>
            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
            />
            </div>
            
            <div class="flex w-2 mt-4">
                <button class="guardar-empresa text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                    dark:focus:ring-blue-800">Guardar</button>
                </div>
            </div>
            </form>
            `;

    const formempresas = document.querySelector("#form-empresas");
    const guardarempresa = div.children[0].children[4].children[1].children[0];
    if (guardarempresa) {
      formempresas.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const nombre = document.getElementById("nombre").value;
          const rif = document.getElementById("rif").value;
          const telefono = document.getElementById("telefono").value;
          const direccion = document.getElementById("direccion").value;
          const email = document.getElementById("email").value;
          const { data } = await axios.post("/api/empresas", {
            nombre,
            rif,
            telefono,
            direccion,
            email,
          });
          console.log({ data });
        } catch (error) {
          console.log(error);
        }
        formempresas.reset();
      });
    }
  }

  if (e.target.closest(".plandecuentas")) {
    libros.innerHTML = ``;
    titulo.innerHTML = `
    <h1 class="text-gray-800 text-center font-bold mt-4 mb-2 text-2xl">Registro de Cuentas</h1>`;
    div.classList.add("w-full");
    div.innerHTML = `
        <form id="form-plandecuentas" class="grid sm:grid-cols-1 md:gap-4 w-6/12 bg-gray-400 rounded p-4 gap-3">
        <div>
            <label for="codigo" class="block mb-1 text-sm font-medium text-gray-900">Codigo</label>
            <input type="text" id="codigo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
        </div>
        <div>
            <label for="nombre" class="block mb-1 text-sm font-medium text-gray-900">Nombre</label>
            <input id="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            <div class="flex w-2 mt-4">
            <button class="guardar-empresa text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
            dark:focus:ring-blue-800">Guardar</button>
            </div>
            </div>
            </form>
            `;

    const formplandecuentas = document.querySelector("#form-plandecuentas");
    const guardarcuentas = div.children[0].children[1].children[2].children[0];
    if (guardarcuentas) {
      formplandecuentas.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const codigo = document.getElementById("codigo").value;
          const nombre = document.getElementById("nombre").value;
          const { data } = await axios.post("/api/cuentas", {
            codigo,
            nombre,
            empresaId,
          });
          console.log({ data });
        } catch (error) {
          console.log(error);
        }
        formplandecuentas.reset();
      });
    }
  }
});

//PARA OBTENER VALORES DE LOS INPUT Y AGREGARLOS A UN ARRAY PRIMERA FORMA USANDO NAME EN LOS INPUT//
// const datos = Object.fromEntries(formData);
//         console.log();

//PARA OBTENER VALORES DE LOS INPUT Y AGREGARLOS A UN ARRAY SEGUNDA FORMA USANDO ID EN LOS INPUT//
//   formData.append("", document.getElementById("codigo").value);
//   formData.append("", document.getElementById("numero-factura").value);
//   formData.append("", document.getElementById("fecha-factura").value);
//   formData.append("", document.getElementById("descripcion").value);
//   formData.append("", document.getElementById("base").value);
//   formData.append("", document.getElementById("iva").value);

//   console.log([...formData]);
