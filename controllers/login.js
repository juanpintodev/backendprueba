const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  const userExist = await User.findOne({ email });

  if (!userExist) {
    return response.status(400).json({ error: "Email o contraseña invalido" });
  }
  if (!userExist.verified) {
    return response
      .status(400)
      .json({ error: "Tu email no ha sido verificado" });
  }

  const isCorrect = await bcrypt.compare(password, userExist.passwordHash);

  if (!isCorrect) {
    return response.status(400).json({ error: "Email o contraseña invalido" });
  }

  const userForToken = {
    id: userExist.id,
  };

  const accessToken = jwt.sign(userForToken, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  response.cookie("accessToken", accessToken, {
    expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  return response.sendStatus(200);
  // return response
  //   .status(201)
  //   .json("Usuario creado. Se envio un correo de confirmacion");
});

module.exports = loginRouter;
