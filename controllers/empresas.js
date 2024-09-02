const empresaRouter = require("express").Router();
const Empresa = require("../models/empresa");

empresaRouter.post("/", async (request, response) => {
  const user = request.user;
  const { nombre, rif, telefono, direccion, email } = request.body;

  if (!Array.isArray(user.empresa)) {
    user.empresa = [];
  }
  const newEmpresa = new Empresa({
    nombre,
    rif,
    telefono,
    direccion,
    email,
    librocompra: [],
    libroventa: [],
    clientes: [],
    proveedores: [],
    cuentas: [],
    asientos: [],
    user: user._id,
  });

  const savedEmpresa = await newEmpresa.save();
  user.empresa = user.empresa.concat(savedEmpresa._id);
  await user.save();
  return response.status(201).json(savedEmpresa);
});

empresaRouter.get("/", async (request, response) => {
  const empresa = await Empresa.find();
  return response.status(201).json(empresa);
});

module.exports = empresaRouter;
