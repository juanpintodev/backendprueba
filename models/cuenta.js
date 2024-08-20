const mongoose = require("mongoose");

const cuentasSchema = new mongoose.Schema({
  codigo: {
    type: String,
  },
  nombre: {
    type: String,
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
  },
});

cuentasSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Cuenta = mongoose.model("Cuentas", cuentasSchema);

module.exports = Cuenta;
