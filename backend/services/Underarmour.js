const db = require("../models");

exports.findUnderArmourAll = async () => await db.Underamour.findAll();

exports.findUnderArmourById = async (id) => await db.Underamour.findByPk(id)

exports.createProduct = async (product, file) => {
  return await db.Underamour.create({
    name: product.name,
    image: file ? file.filename : "",
    price: product.price,
    stock: product.stock,
  });
};

exports.updateProduct = async (id, product, file) => {
  const result = await db.Underamour.findByPk(id);
  if (result) {
    const updateUnderArmour = await db.Underamour.update(
      {
        ...product,
        name: product.name,
        image: file ? file.filename : result.image,
        price: product.price,
        stock: product.stock,
      },
      { where: { id: id } }
    );
    if (updateUnderArmour) {
      return await db.Underamour.findByPk(id);
    }
  }
  return null;
};

exports.deleteProduct = async (id) => {
    const result = await db.Underamour.findByPk(id)
    if(result) {
        await db.Underamour.destroy({
          where: {id: id},
          // truncate: true
        })
        await db.sequelize.query('ALTER TABLE database_stock.underarmour AUTO_INCREMENT=1')
        return true
    }
    return false
};
