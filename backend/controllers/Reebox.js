const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.key);
const reeboxService = require("../services/Reebox");

const getReebox = async (req, res) => {
  const result = await reeboxService.findReeboxAll();
  res.status(200).send(result);
};

const getReeboxById = async (req, res) => {
  const result = await reeboxService.findReeboxById(req.params.id)
  res.status(200).send(result)
}

const createReebox = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      res.status(500).send({ message: error.message });
    }
    res.status(201).send(await reeboxService.createProduct(req.body, req.file));
  });
};

const updateReebox = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      res.status(500).send({ message: error.message });
    }
    const result = await reeboxService.updateProduct(
      req.params.id,
      req.body,
      req.file
    );
    if (result) {
      res.status(200).send({ message: "Update successful" });
    } else {
      res.status(404).send(null);
    }
  });
};

const deleteReebox = async (req, res) => {
  const result = await reeboxService.deleteProduct(req.params.id);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send(null);
  }
};

module.exports = {
  getReebox,
  createReebox,
  updateReebox,
  deleteReebox,
  getReeboxById
};
