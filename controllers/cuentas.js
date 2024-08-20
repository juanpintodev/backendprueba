const cuentaRouter = require("express").Router();
const Empresa = require("../models/empresa");
const Cuenta = require("../models/cuenta");

cuentaRouter.post("/", async (request, response) => {
  const { codigo, nombre, empresaId } = request.body;

  const empresa = await Empresa.findById(empresaId);
  try {
    const newCuenta = new Cuenta({
      codigo,
      nombre,
      empresa: empresaId,
    });

    const savedCuenta = await newCuenta.save();
    empresa.cuentas = empresa.cuentas.concat(savedCuenta._id);
    await empresa.save();
    return response.status(201).json(savedCuenta);
  } catch (error) {
    console.log(error);
  }
});

cuentaRouter.get("/", async (request, response) => {
  const cuentas = await Cuenta.find();
  return response.status(201).json(cuentas);
});

module.exports = cuentaRouter;
