const mongoose = require("mongoose");

const librocomprasSchema = new mongoose.Schema({
  fecha: {
    type: Date,
  },
  rif: {
    type: String,
  },
  numerodocumento: {
    type: Number,
  },
  documento: {
    type: String,
  },
  numerocontrol: {
    type: Number,
  },
  proveedor: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  tipocompra: {
    type: String,
  },
  transaccion: {
    type: String,
  },
  creditofiscal: {
    type: String,
  },
  exento: {
    type: Number,
  },
  base: {
    type: Number,
  },
  iva: {
    type: Number,
  },
  numeroretencion: {
    type: Number,
  },
  retencion: {
    type: Number,
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
  },
});

librocomprasSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Librocompra = mongoose.model("Librocompra", librocomprasSchema);

module.exports = Librocompra;
