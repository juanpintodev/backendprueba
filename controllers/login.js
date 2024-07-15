const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  const userExist = await User.findOne({ email });

  if (!userExist) {
    return response.status(400).json("Email o contraseña invalido");
  }
  if (!userExist.verified) {
    return response.status(400).json("Tu email no ha sido verificado");
  }

  const isCorrect = await bcrypt.compare(password, userExist.passwordHash);

  if (!isCorrect) {
    return response.status(400).json("Email o contraseña invalido");
  }

  const userForToken = {
    id: userExist.id,
  };

  const accesToken = jwt.sign(userForToken, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  console.log(accesToken);
  // return response
  //   .status(201)
  //   .json("Usuario creado. Se envio un correo de confirmacion");
});

module.exports = loginRouter;
