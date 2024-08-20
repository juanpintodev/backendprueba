const mongoose = require("mongoose");

const clientesSchema = new mongoose.Schema({
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

clientesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Cliente = mongoose.model("Cliente", clientesSchema);

module.exports = Cliente;
