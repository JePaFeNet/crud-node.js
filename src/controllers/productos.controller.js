const querystring = require("querystring");
const model = require("../models/Product");

const create = (req, res) => {
  res.render("productos/create");
};

const store = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await model.store(name);
    console.log(result);
    res.redirect("/productos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const index = async (req, res) => {
  try {
    const productos = await model.findAll();
    res.render("productos/index", { productos });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await model.findById(id);
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
    const producto = await model.findById(id);
    console.log(producto);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    res.render("productos/edit", { producto });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await model.update(id, name);
    console.log(result);
    res.redirect("/productos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await model.destroy(id);
    console.log(result);
    res.redirect("/productos");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
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
