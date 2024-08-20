const empresaRouter = require("express").Router();
const Empresa = require("../models/empresa");

empresaRouter.get("/", async (request, response) => {
  const empresa = await Empresa.findOne({ empresa: "consumibles" });
  return response.status(201).json(empresa);
});

empresaRouter.post("/", async (request, response) => {
  const user = request.user;
  const {
    nombre,
    rif,
    telefono,
    direccion,
    email,
    librocompra: [],
    libroventa: [],
    proveedores: [],
    clientes: [],
  } = request.body;
  const newEmpresa = new Empresa({
    nombre,
    rif,
    telefono,
    direccion,
    email,
    librocompra: [],
    libroventa: [],
    proveedores: [],
    clientes: [],
    user: user._id,
  });

  const savedEmpresa = await newEmpresa.save();
  user.empresa = user.empresa.concat(savedEmpresa._id);
  await user.save();
  return response.status(201).json(savedEmpresa);
});

module.exports = empresaRouter;
