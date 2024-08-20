const clienteRouter = require("express").Router();
const Empresa = require("../models/empresa");
const Cliente = require("../models/cliente");

clienteRouter.post("/", async (request, response) => {
  const { nombre, rif, telefono, direccion, email, empresaId } = request.body;

  const empresa = await Empresa.findById(empresaId);

  const newCliente = new Cliente({
    nombre,
    rif,
    telefono,
    direccion,
    email,
    empresa: empresaId,
  });

  const savedCliente = await newCliente.save();
  empresa.clientes = empresa.clientes.concat(savedCliente._id);
  await empresa.save();
  return response.status(201).json(savedCliente);
});

module.exports = clienteRouter;
