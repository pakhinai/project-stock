const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.key);
const pumaService = require("../services/Puma");

const getPuma = async (req, res) => {
  const result = await pumaService.findPumaAll();
  res.status(200).send(result);
};

const getPumaById = async (req, res) => {
  const result = await pumaService.findPumaById(req.params.id)
  res.status(200).send(result)
}

const createPuma = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      res.status(500).send({ message: error.message });
    } else {
      res.status(201).send(await pumaService.createProduct(req.body, req.file));
    }
  });
};

const updatePuma = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      res.status(500).send({ message: error.message });
    }
    const result = await pumaService.updateProduct(
      req.params.id,
      req.body,
      req.file
    );
    if (result) {
      res.status(200).send({ message: "Update successful " });
    } else {
      res.status(404).send(null);
    }
  });
};

const deletePuma = async (req, res) => {
  const result = await pumaService.deleteProduct(req.params.id);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send(null);
  }
};

module.exports = {
  getPuma,
  createPuma,
  updatePuma,
  deletePuma,
  getPumaById
};
