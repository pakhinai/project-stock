const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.key);
const underArmourService = require("../services/Underarmour");

const getUnderarmour = async (req, res) => {
  const result = await underArmourService.findUnderArmourAll();
  res.status(200).send(result);
};

const createUnderarmour = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      res.status(500).send({ message: error.message });
    } else {
      res
        .status(201)
        .send(await underArmourService.createProduct(req.body, req.file));
    }
  });
};

const updateUnderarmour = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      res.status(500).send({ message: error.message });
    }
    const result = await underArmourService.updateProduct(
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

const deleteUnderarmour = async (req,res) => {
    const result = await underArmourService.deleteProduct(req.params.id)
    if(result) {
        res.status(204).send()
    }else {
        res.status(404).send(null)
    }
};

module.exports = {
  getUnderarmour,
  createUnderarmour,
  updateUnderarmour,
  deleteUnderarmour,
};
