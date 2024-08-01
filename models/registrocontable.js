const mongoose = require("mongoose");

const registrocontableSchema = new mongoose.Schema({
  empresa: String,
  librocompra: [
    { codigo: Number },
    { numerofactura: Number },
    { fechafactura: String },
    { descripcion: String },
    { base: Number },
    { iva: Number },
  ],
  libroventa: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

registrocontableSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Registrocontable = mongoose.model(
  "Registrocontable",
  registrocontableSchema
);

module.exports = Registrocontable;
