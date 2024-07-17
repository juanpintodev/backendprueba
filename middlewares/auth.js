const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userExtractor = async (request, response, next) => {
  try {
    const token = request.cookies?.accessToken;
    if (!token) {
      return response.sendStatus(401);
    }
    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    request.user = user;
  } catch {
    return response.sendStatus(401);
  }
  next();
};

module.exports = { userExtractor };
