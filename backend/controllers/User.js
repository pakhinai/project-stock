const userService = require("../services/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  const result = await userService.findUserAll();
  res.status(200).send(result);
};

const loginUser = async (req, res) => {
  const result = await userService.login(req.body);
  if (result) {
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      result.password
    );
    if (checkPassword) {
      const payload = {
        id: result.id,
        username: result.username,
        email: result.email,
      };
      const secretKey = process.env.SECRET_OR_KEY
      const token = jwt.sign(payload, secretKey, { expiresIn: 3600 });
      res.status(200).send({ token: token, message: "Login suscessfully" });
    } else {
      res.status(400).send({ message: "Password is wrong" });
    }
  } else {
    res.status(400).send({ message: "Username is wrong" });
  }
};

const registerUser = async (req, res) => {
  const result = await userService.createUser(req.body);
  if (result) {
    res.status(400).send({ message: "User havs been created" });
  } else {
    res.status(201).send({ message: "User created successfully" });
  }
};

const deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send(null);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUser,
  deleteUser,
};
