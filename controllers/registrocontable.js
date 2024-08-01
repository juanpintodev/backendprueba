const registroContableRouter = require("express").Router();
const Registro = require("../models/registrocontable");

registroContableRouter.post("/", async (request, response) => {
  const user = request.user;
  const [{ codigo, numerofactura, fechafactura, descripcion, base, iva }] =
    request.body;
  const newRegistro = new Registro({
    empresa: "Prueba",
    librocompra: [
      codigo,
      numerofactura,
      fechafactura,
      descripcion,
      base,
      iva,
      { user: user._id },
    ],
  });

  const savedRegistro = await newRegistro.save();
  user.registros = user.registros.concat(savedRegistro._id);
  await user.save();
  return response.status(201).json(savedRegistro);
});

module.exports = registroContableRouter;
