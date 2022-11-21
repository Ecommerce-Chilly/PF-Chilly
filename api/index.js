<<<<<<< HEAD

const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getCategory } = require('./src/controllers/getCategory');
const PORT = 3002;
=======
const app = require("./src/app.js");
// const { Category, Product, Invetory, Discount } = require("./src/db");
const { conn } = require("./src/db.js");
const { getCategory } = require("./src/controllers/getCategory");
const PORT = 3001;
>>>>>>> 6563f1c97d3357dec1f376f60b1d8f71233b8a31

conn.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    
    getCategory();
    console.log(`Server listening on port ${PORT}`);
  });
});
