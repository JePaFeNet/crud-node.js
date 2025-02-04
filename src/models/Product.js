const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Product = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Product.belongsTo(sequelize.models.category);

module.exports = Product;
