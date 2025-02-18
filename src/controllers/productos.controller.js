const path = require("path");
const fs = require("fs");

const sharp = require("sharp");

const model = require("../models/Product");
const modelCategory = require("../models/Category");

const create = async (req, res) => {
  try {
    const categorias = await modelCategory.findAll();

    res.render("productos/create", { categorias });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const store = async (req, res) => {
  const { name, categoryId } = req.body;

  try {
    const image = await upload(req.file);

    const result = await model.create({ name, image, categoryId });
    console.log(result);
    res.redirect("/productos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const index = async (req, res) => {
  try {
    const productos = await model.findAll({
      include: "category",
    });
    res.render("productos/index", { productos });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await model.findByPk(id);
    console.log(producto);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    res.render("productos/show", { producto });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const edit = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await model.findByPk(id);
    console.log(producto);

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    const categorias = await modelCategory.findAll();

    res.render("productos/edit", { producto, categorias });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  // const { filename: image } = req.file;

  try {
    const image = await upload(req.file);

    const producto = await model.findByPk(id);

    const result = await model.update(
      { name, image, categoryId },
      { where: { id } }
    );
    console.log(result);

    if (producto.image) {
      const imagePath = path.resolve(
        __dirname,
        "../../public/uploads",
        producto.image
      );

      fs.unlinkSync(imagePath);
    }

    res.redirect("/productos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await model.destroy({ where: { id } });
    console.log(result);
    res.redirect("/productos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const upload = async (file) => {
  if (!file) {
    return null;
  }

  const imageName = Date.now() + path.extname(file.originalname);

  const imagePath = path.resolve(__dirname, "../../public/uploads", imageName);

  await sharp(file.buffer).resize(300).toFile(imagePath);

  return imageName;
};

module.exports = {
  create,
  store,
  index,
  show,
  edit,
  update,
  destroy,
};
