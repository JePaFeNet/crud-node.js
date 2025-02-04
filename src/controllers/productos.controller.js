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
    const result = await model.create({ name, categoryId });
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

  try {
    const result = await model.update({ name, categoryId }, { where: { id } });
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
    const result = await model.destroy({ where: { id } });
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
