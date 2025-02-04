const model = require("../models/Category");

const create = (req, res) => {
  res.render("categorias/create");
};

const store = async (req, res) => {
  const { name } = req.body;

  try {
    const categoria = await model.create({ name });
    console.log(categoria);

    res.redirect("/categorias");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const index = async (req, res) => {
  try {
    const categorias = await model.findAll();
    res.render("categorias/index", { categorias });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await model.findByPk(id);
    console.log(categoria);

    if (!categoria) {
      return res.status(404).send("No existe la categoría");
    }

    res.render("categorias/show", { categoria });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const edit = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await model.findByPk(id);
    console.log(categoria);

    if (!categoria) {
      return res.status(404).send("No existe la categoría");
    }

    res.render("categorias/edit", { categoria });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await model.update({ name }, { where: { id } });
    console.log(result);

    res.redirect("/categorias");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await model.destroy({ where: { id } });
    console.log(result);

    res.redirect("/categorias");
  } catch (error) {
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
