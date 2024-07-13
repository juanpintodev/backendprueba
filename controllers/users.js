const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { PAGE_URL } = require("../config");

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ error: "Todos los campos son requeridos" });
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return response.status(400).json({ error: "El correo ya esta en uso" });
  }

  const saltRound = 10;

  const passwordHash = await bcrypt.hash(password, saltRound);

  const newUser = new User({
    name,
    email,
    password,
  });

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser.id }, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: savedUser.email, // list of receivers
    subject: "Autenticacion de usuario, no responder este coreo", // Subject line
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Correo de confirmacion</a>`, // html body
  });

  return response
    .status(201)
    .json("Usuario creado. Se envio un correo de confirmacion");
});

usersRouter.patch("/:token", async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    console.log(decodedToken);
  } catch (error) {
    const token = jwt.sign(
      { id: savedUser.id },
      process.env.ACCES_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: savedUser.email, // list of receivers
      subject: "Autenticacion de usuario, no responder este coreo", // Subject line
      html: `<a href="${PAGE_URL}/verify/${token}">Correo de confirmacion</a>`, // html body
    });
    return response.status(400).json({ error: "El link ya expiro" });
  }
});

module.exports = usersRouter;
