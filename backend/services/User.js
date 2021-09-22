const db = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.findUserAll = async () => await db.User.findAll();

exports.createUser = async (body) => {
  const result = await db.User.findOne({
    where: {
      [Op.or]: [{ username: body.username }, { email: body.email }],
    },
  });
  if (result) {
    return true;
  } else {
    const salt = bcrypt.genSaltSync(12);
    const hashPassword = bcrypt.hashSync(body.password, salt);
    await db.User.create({
      username: body.username,
      password: hashPassword,
      email: body.email,
    });
    return false;
  }
};

exports.login = async (body) => {
  const result = await db.User.findOne({ where: { username: body.username } });
  if (result) {
    return result;
  }
  return null;
};

exports.deleteUser = async (id) => {
  const result = await db.User.findByPk(id);
  if (result) {
    await db.User.destroy({
      where: { id: id },
      // truncate: true
    });
    await db.sequelize.query('ALTER TABLE database_stock.users AUTO_INCREMENT=1')
    return true;
  }
  return false;
};
