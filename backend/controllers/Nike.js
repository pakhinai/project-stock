const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.key);
const nikeService = require("../services/Nike");

const getNike = async (req, res) => {
  const data = await nikeService.findNikeAll();
  res.status(200).send(data);
};

const getNikeById = async (req, res) => {
  const data = await nikeService.findNikeById(req.params.id)
  res.status(200).send(data)
}

const createNike = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res.status(500).json({ message: error.message });
    } else {
      return res
        .status(201)
        .send(await nikeService.addProduct(req.body, req.file));
    }
  });
};

const updateNike = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify}`);
      return res.status(500).json({ message: error.message });
    }
    const result = await nikeService.updateProduct(
      req.params.id,
      req.body,
      req.file
    );
    if(result) {
        return res.status(201).send({message: "Update successful"})
    } else {
        return res.status(404).send(null)
    }
  });
};

const deleteNike = async (req, res) => {
    const result = await nikeService.deleteProduct(req.params.id)
    if(result) {
        res.status(204).send()
    } else {
        res.status(404).send(null)
    }
};

module.exports = {
  getNike,
  createNike,
  updateNike,
  deleteNike,
  getNikeById
};
