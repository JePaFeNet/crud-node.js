const express = require("express");
const router = express.Router();

const querystring = require("querystring");

router.get("/", (req, res) => {
  const query = querystring.stringify(req.query);

  fetch("https://fakestoreapi.com/products?" + query)
    .then((res) => res.json())
    .then((productos) => res.json(productos));
});

router.get("/:id", (req, res) => {
  fetch("https://fakestoreapi.com/products/" + req.params.id)
    .then((res) => res.json())
    .then((producto) => res.json(producto));
});

module.exports = router;
