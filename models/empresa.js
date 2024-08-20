const mongoose = require("mongoose");

const empresaSchema = new mongoose.Schema({
  nombre: String,
  rif: String,
  telefono: Number,
  direccion: String,
  email: String,
  librocompra: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Librocompra",
    },
  ],
  libroventa: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Libroventa",
    },
  ],
  proveedores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proveedores",
    },
  ],
  clientes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clientes",
    },
  ],
  cuentas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuentas",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

empresaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Empresa = mongoose.model("Empresa", empresaSchema);

module.exports = Empresa;
