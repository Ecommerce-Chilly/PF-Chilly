const { Product, Category, Inventory, Discount } = require("../db");
const caseData = require("../dataApi/case.json");
const postInvetory = require("./postInventory");

const create = async function (el, datos = [], invCreate, categoryDB) {
  const details = datos.map((element) => {
    return { [element]: el[element] };
  });
  const proCreate = await Product.create({
    name: el.title,
    image: el.img,
    price: el.price,
    brand: el.brand,
    model: el.model,
    details: details,
  });
  await proCreate.setCategory(categoryDB);
  await proCreate.setDiscount(null);
  await invCreate.setProduct(proCreate);
  await proCreate.setInventory(invCreate);
};
async function hardCodeoInfo() {
  const invCreate = await postInvetory(12);
  const categoryDB = await Category.findOne({ where: { name: "cases" } });
  for (let i = 0; i < caseData.length; i++) {
    const el = caseData[i];
    create(el, ["sidePanel", "color", "cabinetType"], invCreate, categoryDB);
  }
  console.log(await Product.findAll());
}
module.exports = { hardCodeoInfo };
