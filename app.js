require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
// const tasksRouter = require("./controllers/tasks");
const { userExtractor } = require("./middlewares/auth");
const empresaRouter = require("./controllers/empresas");
const libroCompraRouter = require("./controllers/librocompras");
const libroVentaRouter = require("./controllers/libroventas");
const proveedorRouter = require("./controllers/proveedores");
const clienteRouter = require("./controllers/clientes");
const cuentaRouter = require("./controllers/cuentas");
const asientoRouter = require("./controllers/asientos");
const { MONGO_URI } = require("./config");

(async () => {
  try {
    mongoose.connect(MONGO_URI);
    console.log("Conectados a MongoDB");
  } catch (error) {
    console.log(error);
  }
})();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Frontend routes
app.use("/", express.static(path.resolve("views", "home")));
app.use("/styles", express.static(path.resolve("views", "styles")));
app.use("/signup", express.static(path.resolve("views", "signup")));
app.use("/login", express.static(path.resolve("views", "login")));
// app.use("/dashboard", express.static(path.resolve("views", "dashboard")));
app.use("/dashboard2", express.static(path.resolve("views", "dashboard2")));
app.use(
  "/select-company",
  express.static(path.resolve("views", "select-company"))
);
app.use("/images", express.static(path.resolve("images")));
app.use("/components", express.static(path.resolve("views", "components")));
app.use("/verify/:id/:token", express.static(path.resolve("views", "verify")));

app.use(morgan("tiny"));
// Backend routes
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
// app.use("/api/tasks", userExtractor, tasksRouter);
app.use("/api/empresas", userExtractor, empresaRouter);
app.use("/api/librocompras", userExtractor, libroCompraRouter);
app.use("/api/libroventas", userExtractor, libroVentaRouter);
app.use("/api/proveedores", userExtractor, proveedorRouter);
app.use("/api/clientes", userExtractor, clienteRouter);
app.use("/api/cuentas", userExtractor, cuentaRouter);
app.use("/api/asientos", userExtractor, asientoRouter);
module.exports = app;
