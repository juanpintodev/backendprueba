const libroVentaRouter = require("express").Router();
const Empresa = require("../models/empresa");
const Venta = require("../models/libroventa");

libroVentaRouter.post("/", async (request, response) => {
  const {
    fecha,
    rif,
    numerodocumento,
    documento,
    numerocontrol,
    cliente,
    descripcion,
    tipoventa,
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
  console.log(empresa.libroventa);
  const newVenta = new Venta({
    fecha,
    rif,
    cliente,
    numerodocumento,
    documento,
    numerocontrol,
    descripcion,
    tipoventa,
    transaccion,
    creditofiscal,
    exento,
    base,
    iva,
    numeroretencion,
    retencion,
    empresa: empresaId,
  });

  const savedVenta = await newVenta.save();
  empresa.libroventa = empresa.libroventa.concat(savedVenta._id);
  await empresa.save();
  return response.status(201).json(savedVenta);
});

libroVentaRouter.get("/", async (request, response) => {
  Venta.find().then((libroventa) => {
    console.log(libroventa);
    return response.status(201).json(libroventa);
  });
});
module.exports = libroVentaRouter;
