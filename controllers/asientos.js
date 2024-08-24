const asientoRouter = require("express").Router();
const Empresa = require("../models/empresa");
const Asiento = require("../models/asiento");

asientoRouter.post("/", async (request, response) => {
  const {
    numeroAsiento,
    items: asientos,
    fechaAsiento,
    totalDe,
    totalHa,
    empresaId,
  } = request.body;

  const empresa = await Empresa.findById(empresaId);
  console.log(empresa.asientos);
  const newAsiento = new Asiento({
    numero: numeroAsiento,
    items: asientos,
    fecha: fechaAsiento,
    totales: { debe: totalDe, haber: totalHa },
    empresa: empresaId,
  });

  const savedAsiento = await newAsiento.save();
  empresa.asientos = empresa.asientos.concat(savedAsiento._id);
  await empresa.save();
  return response.status(201).json(savedAsiento);
});

// asientosRouter.get("/", async (request, response) => {
//   Asiento.find().then((librocompra) => {
//     console.log(librocompra);
//     return response.status(201).json(librocompra);
//   });
// });
module.exports = asientoRouter;
