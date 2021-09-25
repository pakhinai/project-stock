const db = require("../models");

exports.findAdidasAll = async (user) =>
  await db.Adidas.findAll();

exports.findAdidasById = async (id) => await db.Adidas.findByPk(id)

exports.addProduct = async (product, file) => {
  return await db.Adidas.create({
    name: product.name,
    image: file ? file.filename : "",
    price: product.price,
    stock: product.stock,
  });
};

exports.updateProduct = async (id, product, file) => {
  const result = await db.Adidas.findByPk(id);
  if (result) {
    const update = await db.Adidas.update(
      {
        ...product,
        name: product.name,
        image: file ? file.filename : result.image,
        price: product.price,
        stock: product.stock,
      },
      { where: { id: id } }
    );
    if (update) {
      return await db.Adidas.findByPk(id);
    }
  }
  return null;
};

exports.deleteProduct = async (id) => {
  const result = await db.Adidas.findByPk(id);
  if (result) {
    await db.Adidas.destroy({
       where: { id: id } ,
      //  truncate: true
      });
    await db.sequelize.query(
      "ALTER TABLE database_stock.adidas AUTO_INCREMENT=1"
    );
    return true;
  } else {
    return false;
  }
};
