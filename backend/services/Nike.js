const db = require("../models");

exports.findNikeAll = async () => await db.Nike.findAll();

exports.findNikeById = async (id) => await db.Nike.findByPk(id)

exports.addProduct = async (product, file) => {
  return await db.Nike.create({
    name: product.name,
    image: file ? file.filename : "",
    price: product.price,
    stock: product.stock,
  });
};

exports.updateProduct = async (id, product, file) => {
  const result = await db.Nike.findByPk(id);
  if (result) {
    const updateData = await db.Nike.update(
      {
        ...product,
        name: product.name,
        image: file ? file.filename : result.image,
        price: product.price,
        stock: product.stock,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (updateData) {
      return await db.Nike.findByPk(id);
    }
  }
  return null;
};

exports.deleteProduct = async (id) => {
  const result = await db.Nike.findByPk(id);
  if (result) {
    await db.Nike.destroy({ 
      where: { id: id }, 
      // truncate: true
    });
    await db.sequelize.query('ALTER TABLE database_stock.nike AUTO_INCREMENT=1')
    return true;
  }
  return false;
};
