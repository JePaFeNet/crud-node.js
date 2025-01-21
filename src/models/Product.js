const pool = require("./mysql");

const store = async (name) => {
  const sql = `INSERT INTO products (name) VALUES (?)`;

  try {
    const [result] = await pool.query(sql, [name]);
    return result;
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  const sql = "SELECT * FROM products";

  try {
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
};

const findById = async (id) => {
  const sql = `SELECT * FROM products WHERE id = ?`;

  try {
    const [rows] = await pool.query(sql, [id]);
    // console.log(rows, rows.shift())
    return rows.shift();
  } catch (error) {
    throw error;
  }
};

const update = async (id, name) => {
  const sql = `UPDATE products SET name = ? WHERE id = ?`;

  try {
    const [result] = await pool.query(sql, [name, id]);
    return result;
  } catch (error) {
    throw error;
  }
};

const destroy = async (id) => {
  const sql = `DELETE FROM products WHERE id = ?`;

  try {
    const [result] = await pool.query(sql, [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  store,
  findAll,
  findById,
  update,
  destroy,
};
