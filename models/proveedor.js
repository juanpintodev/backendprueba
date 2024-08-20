const mongoose = require("mongoose");

const proveedoresSchema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  rif: {
    type: String,
  },
  telefono: {
    type: Number,
  },
  direccion: {
    type: String,
  },
  email: {
    type: String,
  },
  retencioniva: {
    type: Number,
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
  },
});

proveedoresSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Proveedor = mongoose.model("Proveedor", proveedoresSchema);

module.exports = Proveedor;
