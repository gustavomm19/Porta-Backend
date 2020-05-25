const jwt = require("jsonwebtoken");

module.exports = async ({ req, connection }) => {
  let authToken;

  if (connection) {
    authToken = connection.context.authToken;
    if (!authToken) return;
  } else {
    authToken = req.get("Authorization");
  }
  if (!authToken) {
    req.isAuth = false;
    return;
  }
  const token = authToken.split(" ")[1];
  if (!token || token === "") {
    return;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.CREDENTIALS_JWT);
  } catch (err) {
    return;
  }
  if (!decodedToken) {
    req.isAuth = false;
    return;
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;

  return { token };
};
