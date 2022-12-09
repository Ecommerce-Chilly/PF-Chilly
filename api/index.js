const app = require("./src/app.js");
// const { Category, Product, inventory, Discount } = require("./src/db");
const { conn } = require("./src/db.js");
const { getCategory } = require("./src/controllers/category/getCategory");
const { hardCodeoInfo } = require('./src/controllers/hardCode')
const port = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  app.listen(port, () => {
    hardCodeoInfo();
    getCategory();
    console.log(`Server listening on port ${port}`);
  });
});