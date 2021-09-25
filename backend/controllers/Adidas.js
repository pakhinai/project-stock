const adidasService = require("../services/Adidas");
const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.key);

const getAdidas = async (req, res) => {
  const data = await adidasService.findAdidasAll();
  res.status(200).send(data);
};

const getAdidasById = async (req, res) => {
  const data = await adidasService.findAdidasById(req.params.id)
  res.status(200).send(data)
}

const createAdidas = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify}`);
      return res.status(500).json({ message: error.message });
    } else {
      return res
        .status(201)
        .send(await adidasService.addProduct(req.body, req.file));
    }
  });
};

const updateAdidas = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ message: error.message });
    }
    const result = await adidasService.updateProduct(
      req.params.id,
      req.body,
      req.file
    );
    if (result) {
        res.status(200).send({message: "Update successful"})
    } else {
        res.status(404).send(null)
    }
  });
};

const deleteAdidas = async (req, res) => {
    const result = await adidasService.deleteProduct(req.params.id)
    if(result) {
        res.status(204).send()
    } else {
        res.status(404).send(null)
    }
};

module.exports = {
  getAdidas,
  createAdidas,
  updateAdidas,
  deleteAdidas,
  getAdidasById
};
