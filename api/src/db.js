require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;


const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/chilly`,
  {
    logging: false,
    native: false,
  }
);
// const sequelize = new Sequelize(DB_DEPLOY,
//   {
//     logging: false,
//     native: false,
//   }
// );
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Product,
  Administrator,
  Inventory,
  Discount,
  Category,
  Cart,
  Clients,
  Data_user,
  Order_details,
  Order_items,
  Payment_details,
  Payment_user,
  Shopping_session,
  User_role,
  User,
} = sequelize.models;

Category.hasMany(Product);
Product.belongsTo(Category);

Discount.hasMany(Product);
Product.belongsTo(Discount);

Product.hasOne(Inventory);
Inventory.hasOne(Product);

Administrator.hasOne(Clients);
Clients.hasOne(Administrator);

Administrator.hasOne(User_role);
User_role.hasMany(Administrator);

User.hasMany(User_role);
User_role.belongsTo(User);

User.hasOne(Data_user);
Data_user.belongsTo(User);

User.hasOne(Shopping_session);
Shopping_session.hasOne(User);

Payment_details.hasOne(Order_details);
Order_details.hasOne(Payment_details);

Product.hasOne(Order_items);
Order_items.belongsTo(Product);

Order_items.belongsTo(User);
User.hasMany(Order_items);

Cart.belongsTo(User)
User.hasMany(Cart)

Cart.hasMany(User)
User.belongsTo(Cart)

User.hasMany(Order_details);
Order_details.belongsTo(User);

User.belongsToMany(Product, { through: "favorites", paranoid: true });
Product.belongsToMany(User, { through: "favorites", paranoid: true });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};