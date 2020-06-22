const jwt = require("jsonwebtoken");

module.exports = async ({ req }) => {
  let authToken;
  authToken = req.get("Authorization");
  if (!authToken) {
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
    return;
  }
  return {
    token: decodedToken,
  };
};
