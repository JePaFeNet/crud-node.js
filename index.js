require("dotenv").config();

const express = require("express");
const app = express();

const layouts = require("express-ejs-layouts");

const path = require("path");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(layouts);
app.set("layout", "layouts/layout");

const mainRouter = require("./src/routes/main.router");
app.use(mainRouter);

app.use("/productos", require("./src/routes/productos.router"));
app.use("/contacto", require("./src/routes/contacto.router"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
