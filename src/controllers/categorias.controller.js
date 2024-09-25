const fs = require("fs");
const path = require("path");

let categorias = [];

const create = (req, res) => {
  res.render("categorias/create");
};

const store = (req, res) => {
  const { nombre } = req.body;

  const categoria = {
    id: Date.now(),
    nombre,
  };

  categorias.push(categoria);

  fs.writeFileSync(
    path.resolve(__dirname, "../../categorias.json"),
    JSON.stringify(categorias)
  );

  res.redirect("/categorias");
};

const index = (req, res) => {
  try {
    categorias = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
    );
  } catch (error) {
    categorias = [];
  }

  res.render("categorias/index", { categorias });
};

const show = (req, res) => {
  categorias = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
  );

  const { id } = req.params;

  const categoria = categorias.find((categoria) => categoria.id == id);
  //   console.log(categoria);

  if (!categoria) {
    return res.status(404).send("No existe la categoria");
  }

  res.render("categorias/show", { categoria });
};

const edit = (req, res) => {
  categorias = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
  );

  const { id } = req.params;

  const categoria = categorias.find((categoria) => categoria.id == id);

  if (!categoria) {
    return res.status(404).send("No existe la categoria");
  }

  res.render("categorias/edit", { categoria });
};

const update = (req, res) => {
  categorias = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
  );

  const { id } = req.params;
  const { nombre } = req.body;

  const categoria = categorias.find((categoria) => categoria.id == id);

  if (!categoria) {
    return res.status(404).send("No existe la categoria");
  }

  categoria.nombre = nombre;

  fs.writeFileSync(
    path.resolve(__dirname, "../../categorias.json"),
    JSON.stringify(categorias)
  );

  res.redirect("/categorias");
};

const destroy = (req, res) => {
  categorias = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
  );

  const { id } = req.params;

  const index = categorias.findIndex((categoria) => categoria.id == id);

  if (index == -1) {
    return res.status(404).send("No existe la categoria");
  }

  categorias.splice(index, 1);

  fs.writeFileSync(
    path.resolve(__dirname, "../../categorias.json"),
    JSON.stringify(categorias)
  );

  res.redirect("/categorias");
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
