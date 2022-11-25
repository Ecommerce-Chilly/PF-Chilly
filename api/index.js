const app = require("./src/app.js");
// const { Category, Product, Invetory, Discount } = require("./src/db");
const { conn } = require("./src/db.js");
const { getCategory } = require("./src/controllers/getCategory");
const PORT = 3001;

conn.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    getCategory();
    console.log(`Server listening on port ${PORT}`);
  });
});
