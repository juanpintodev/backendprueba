const libroCompraRouter = require("express").Router();
const Empresa = require("../models/empresa");
const Compra = require("../models/librocompra");

libroCompraRouter.post("/", async (request, response) => {
  const {
    fecha,
    rif,
    numerodocumento,
    documento,
    numerocontrol,
    proveedor,
    descripcion,
    tipocompra,
    transaccion,
    creditofiscal,
    exento,
    base,
    iva,
    numeroretencion,
    retencion,
    empresaId,
  } = request.body;

  const empresa = await Empresa.findById(empresaId);
  console.log(empresa.librocompra);
  const newCompra = new Compra({
    fecha,
    rif,
    proveedor,
    numerodocumento,
    documento,
    numerocontrol,
    descripcion,
    tipocompra,
    transaccion,
    creditofiscal,
    exento,
    base,
    iva,
    numeroretencion,
    retencion,
    empresa: empresaId,
  });

  const savedCompra = await newCompra.save();
  empresa.librocompra = empresa.librocompra.concat(savedCompra._id);
  await empresa.save();
  return response.status(201).json(savedCompra);
});

libroCompraRouter.get("/", async (request, response) => {
  Compra.find().then((librocompra) => {
    console.log(librocompra);
    return response.status(201).json(librocompra);
  });
});
module.exports = libroCompraRouter;
