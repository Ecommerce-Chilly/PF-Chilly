require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/chilly`,
   {
      logging: false,
      native: false,
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
   .filter(
      (file) =>
         file.indexOf(".") !== 0 &&
         file !== basename &&
         file.slice(-3) === ".js"
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
   Inventory, //
   Discount, //
   Category, //
   Clients, //
   Cart_item,
   Data_user,
   Order_details,
   Order_items,
   Payment_details,
   Payment_user,
   Shopping_session,
   User,
   User_role,
} = sequelize.models;

Category.hasOne(Product);
Product.belongsTo(Category);

Product.belongsTo(Inventory);
Inventory.belongsTo(Product);

Discount.hasMany(Product);
Product.belongsTo(Discount);

User.hasOne(Data_user);
Data_user.belongsTo(User);

User.hasMany(Payment_user);
Payment_user.belongsTo(User);

Payment_details.hasOne(Order_details);
Order_details.hasOne(Payment_details);

Order_details.hasOne(Order_items);
Order_items.hasOne(Order_details);

Product.hasOne(Order_items);
Order_items.hasOne(Product);

Product.hasOne(Cart_item); //
Cart_item.belongsTo(Product); //

Order_items.hasOne(User);
User.hasMany(Order_items);

Order_items.hasMany(Order_details);
Order_details.hasMany(Order_items);

User.hasMany(Order_details);
Order_details.hasOne(User);

Administrator.belongsTo(User, { through: User_role, paranoid: true }); //
User.belongsToMany(Administrator, { through: User_role, paranoid: true }); //

Administrator.belongsTo(User, { through: Clients, paranoid: true }); //
User.belongsToMany(Administrator, { through: "clients", paranoid: true }); //

User.belongsToMany(Product, { through: "favorites", paranoid: true }); //
Product.belongsToMany(User, { through: "favorites", paranoid: true }); //

module.exports = {
   ...sequelize.models,
   conn: sequelize,
};
