const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

exports.findAdmin = async () => await db.Admin.findAll();

exports.createAdmin = async (body) => {
  const result = await db.Admin.findOne({ where: { username: body.username } });
  if(result) {
      return true
  } else {
      const salt = bcrypt.genSaltSync(12)
      const hashPassword = bcrypt.hashSync(body.password, salt)
      await db.Admin.create({
        username: body.username,
        password: hashPassword
      })
      return false
  }
};

exports.deleteAdmin = async (id) => {
  const result = await db.Admin.findByPk(id);
  if (result) {
    await db.Admin.destroy({
      where: { id: id },
    //    truncate: true
    });
    await db.sequelize.query(
      "ALTER TABLE database_stock.users AUTO_INCREMENT=1"
    );
    return true;
  }
  return false;
};

exports.loginAdmin = async (body) => {
    const result = await db.Admin.findOne({where: {username: body.username}})
    if(result) {
        return result
    } else {
        return null
    }
};
