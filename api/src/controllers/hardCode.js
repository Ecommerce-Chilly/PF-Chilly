const { Product, Category, Inventory, Discount } = require("../db");
const caseData = require("../dataApi/case.json");
const postInvetory = require("./postInventory");

async function hardCodeoInfo() {
  const invCreate = await postInvetory(12);
  const categoryDB = await Category.findOne({ where: { name: "cases" } });
  for (let i = 0; i < caseData.length; i++) {
    const el = caseData[i];
    const hola = async (el) => {
      const proCreate = await Product.create({
        name: el.title,
        image: el.img,
        price: el.price,
        brand: el.brand,
        model: el.model,
        details: [
          {
            sidePanel: el.sidePanel,
            color: el.color,
            cabinetType: el.cabinetType,
          },
        ],
      });
      await proCreate.setCategory(categoryDB);
      await proCreate.setDiscount(null);
      await invCreate.setProduct(proCreate);
      await proCreate.setInventory(invCreate);
      console.log(proCreate);
    };
    hola(el);
  }
  console.log(await Product.findAll());
}
module.exports = { hardCodeoInfo };
