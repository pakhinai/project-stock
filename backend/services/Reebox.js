const db = require("../models");

exports.findReeboxAll = async () => await db.Reebox.findAll();

exports.createProduct = async (product, file) => {
  return await db.Reebox.create({
    name: product.name,
    image: file ? file.filename : "",
    price: product.price,
    stock: product.stock,
  });
};

exports.updateProduct = async (id, product, file) => {
  const result = await db.Reebox.findByPk(id);
  if (result) {
    const updateReebox = await db.Reebox.update(
      {
        ...product,
        name: product.name,
        image: file ? file.filename : result.image,
        price: product.price,
        stock: product.stock,
      },
      { where: { id: id } }
    );
    if (updateReebox) {
      return await db.Reebox.findByPk(id);
    }
  }
  return null;
};

exports.deleteProduct = async (id) => {
  const result = await db.Reebox.findByPk(id);
  if (result) {
    await db.Reebox.destroy({ 
      where: { id: id } ,
      // truncate: true
    });
    await db.sequelize.query('ALTER TABLE database_stock.reebox AUTO_INCREMENT=1')
    return true;
  }
  return false;
};
