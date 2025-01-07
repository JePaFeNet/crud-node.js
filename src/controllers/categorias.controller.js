const model = require("../models/Category");

const create = (req, res) => {
  res.render("categorias/create");
};

const store = (req, res) => {
  const { name } = req.body;

  model.create(name, (error, id) => {
    if (error) {
      // console.error(error);

      return res.status(500).send("Internal Server Error");
    }

    console.log(id);

    res.redirect("/categorias");
  });
};

const index = (req, res) => {
  model.findAll((error, categorias) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    res.render("categorias/index", { categorias });
  });
};

const show = (req, res) => {
  const { id } = req.params;

  model.findById(id, (error, categoria) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    // console.log(categoria);

    if (!categoria) {
      return res.status(404).send("No existe la categoría");
    }

    res.render("categorias/show", { categoria });
  });
};

const edit = (req, res) => {
  const { id } = req.params;

  model.findById(id, (error, categoria) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    if (!categoria) {
      return res.status(404).send("No existe la categoría");
    }

    res.render("categorias/edit", { categoria });
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  model.update(id, name, (error, changes) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    // console.log(changes);

    res.redirect("/categorias");
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  model.destroy(id, (error, changes) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    // console.log(changes);

    res.redirect("/categorias");
  });
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
