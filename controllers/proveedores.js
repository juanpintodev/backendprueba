const proveedorRouter = require("express").Router();
const Empresa = require("../models/empresa");
const Proveedor = require("../models/proveedor");

proveedorRouter.post("/", async (request, response) => {
  const { nombre, rif, telefono, direccion, email, retencioniva, empresaId } =
    request.body;

  const empresa = await Empresa.findById(empresaId);
  try {
    const newProveedor = new Proveedor({
      nombre,
      rif,
      telefono,
      direccion,
      email,
      retencioniva,
      empresa: empresaId,
    });

    const savedProveedor = await newProveedor.save();
    empresa.proveedores = empresa.proveedores.concat(savedProveedor._id);
    await empresa.save();
    return response.status(201).json(savedProveedor);
  } catch (error) {
    console.log(error);
  }
});

proveedorRouter.get("/", async (request, response) => {
  const proveedores = await Proveedor.find();
  return response.status(201).json(proveedores);
});

module.exports = proveedorRouter;
