const mongoose = require("mongoose");

const asientoSchema = new mongoose.Schema({
  numero: {
    type: Number,
    unique: true,
  },
  fecha: {
    type: Date,
  },
  items: [
    {
      cuenta: {
        type: String,
      },
      concepto: {
        type: String,
      },
      debe: {
        type: Number,
      },
      haber: {
        type: Number,
      },
    },
  ],
  totales: {
    debe: {
      type: Number,
    },
    haber: {
      type: Number,
    },
  },
});

asientoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Asiento = mongoose.model("Asiento", asientoSchema);

module.exports = Asiento;
