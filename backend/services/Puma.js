const db = require("../models");

exports.findPumaAll = async () => await db.Puma.findAll();

exports.createProduct = async (product, file) => {
  return await db.Puma.create({
    name: product.name,
    image: file ? file.filename : "",
    price: product.price,
    stock: product.stock,
  });
};

exports.updateProduct = async (id, product, file) => {
  const result = await db.Puma.findByPk(id);
  if (result) {
    const updatePuma = await db.Puma.update(
      {
        ...product,
        name: product.name,
        image: file ? file.filename : result.image,
        price: product.price,
        stock: product.stock,
      },
      { where: { id: id } }
    );
    if (updatePuma) {
      return await db.Puma.findByPk(id);
    }
  }
  return null;
};

exports.deleteProduct = async (id) => {
  const result = await db.Puma.findByPk(id);
  if (result) {
    await db.Puma.destroy({ 
      where: { id: id }, 
      // truncate: true
    });
    await db.sequelize.query('ALTER TABLE database_stock.puma AUTO_INCREMENT=1')
    return true;
  }
  return false;
};
