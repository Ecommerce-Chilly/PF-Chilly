import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createProduct,
  createDiscount,
} from "../../../redux/actions/actions.js";
const { validate } = require("../ChangeComponent/utils");

function CreateComponent() {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.createProductMsg);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    brand: "",
    model: "",
    quantity: "",
    category: "",
    details: [],
    discount: "",
  });
  const [discountt, setDiscountt] = useState({
    name: `${newProduct.discount}`,
    description: "",
    percent: 0,
    active: 0,
  });

  const handleDiscount = (e) => {
    setDiscountt({
      ...discountt,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...newProduct,
        [e.target.name]: e.target.value,
      })
    );
    if (e.target.name === "discount") {
      setDiscountt({
        ...discountt,
        name: e.target.value,
      });
    }
  };

  const handleDetailChange = (e) => {
    setNewProduct({
      ...newProduct,
      details: [{ ...newProduct.details[0], [e.target.name]: e.target.value }],
    });
  };

  function dispatchDataToCreate(newProduct) {
    dispatch(createProduct(newProduct, token));
  }
  function dispatchDataToDiscount(newProduct) {
    dispatch(createDiscount(newProduct, token));
  }

  return (
    <div className="w-2/3 m-auto mb-9">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatchDataToCreate(newProduct);
          dispatchDataToDiscount(discountt);
          setTimeout(() => history.push("/panel+admin/products"), 3000);
        }}
        className="w-2/3 m-auto mt-9"
      >
        <div className="form-header">
          <h1 className="text-3xl text-slate-800   font-display font-semibold mt-12 ml-50 mb-9">
            Create Product
          </h1>
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product name:
        </label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Type name here"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
        ></input>
        {errors.name && <p className="text-red-400 mb-4">{errors.name}</p>}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product price:
        </label>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Set a price"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
        ></input>
        {errors.price && <p className="text-red-400 mb-4">{errors.price}</p>}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product brand:
        </label>
        <select
          name="brand"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
          onChange={handleChange}
        >
          <option></option>
          <option>Alphacool</option>
          <option>Antec</option>
          <option>ASUS</option>
          <option>ASRock</option>
          <option>Apevia</option>
          <option>ARCTIC</option>
          <option>AMD</option>
          <option>be quiet!</option>
          <option>Biostar</option>
          <option>BenQ</option>
          <option>Corsair</option>
          <option>Cooler Master</option>
          <option>Crucial</option>
          <option>Cryorig</option>
          <option>Diamond Multimedia</option>
          <option>DEEPCOOL</option>
          <option>Dragonwar</option>
          <option>DIYPC</option>
          <option>Das Keyboard</option>
          <option>Dland</option>
          <option>EagleTec</option>
          <option>ECS Elitegroup</option>
          <option>EVGA</option>
          <option>Fractal Design</option>
          <option>Gelid Solutions</option>
          <option>Gigabyte</option>
          <option>G.Skill</option>
          <option>Gray Star</option>
          <option>Happy</option>
          <option>HIS</option>
          <option>HUO JI</option>
          <option>HP</option>
          <option>Intel</option>
          <option>Insignia</option>
          <option>Kingston</option>
          <option>Kensington</option>
          <option>Logitech</option>
          <option>MSI</option>
          <option>Mushkin</option>
          <option>Marshal</option>
          <option>NZXT</option>
          <option>Noctua</option>
          <option>Phanteks</option>
          <option>PowerColor</option>
          <option>Patriot Memory</option>
          <option>PNY</option>
          <option>Qisan</option>
          <option>Rosewill</option>
          <option>Redragon</option>
          <option>Razer</option>
          <option>SilverStone Technology</option>
          <option>SAMSUNG</option>
          <option>Seasonic</option>
          <option>Supermicro</option>
          <option>SteelSeries</option>
          <option>Sapphire Technologys</option>
          <option>Seagate</option>
          <option>Thermaltake</option>
          <option>Thermalright</option>
          <option>Toshiba</option>
          <option>VisionTek</option>
          <option>Western Digital</option>
          <option>White Label</option>
          <option>XFX</option>
          <option>ZOTAC</option>
        </select>
        {errors.brand && <p className="text-red-400 mb-4">{errors.brand}</p>}

        {newProduct.brand === "" ? (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Product model:
            </label>
            <input
              className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
              disabled
              placeholder="Select a brand first"
            ></input>
          </>
        ) : newProduct.brand.length ? (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Product model:
            </label>
            <input
              className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
              name="model"
              onChange={handleChange}
              placeholder="Type model"
            ></input>
            {errors.model && (
              <p className="text-red-400 mb-4">{errors.model}</p>
            )}
          </>
        ) : (
          <></>
        )}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product Img (URL):
        </label>
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Type Img URL here"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
        ></input>

        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product details:
        </label>
        <input
          type="text"
          name="brand"
          onChange={handleDetailChange}
          placeholder="Type brand here"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
        ></input>
        <input
          type="text"
          name="cosito"
          onChange={handleDetailChange}
          placeholder="Type cosito here"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
        ></input>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product category:
        </label>
        <select
          name="category"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
          onChange={handleChange}
        >
          <option></option>
          <option>cases</option>
          <option>case_fan</option>
          <option>cpu_fan</option>
          <option>gpus</option>
          <option>keyboards</option>
          <option>motherboards</option>
          <option>mouses</option>
          <option>processors</option>
          <option>power_supply</option>
          <option>ram</option>
          <option>storage</option>
        </select>
        {errors.category && (
          <p className="text-red-400 mb-4">{errors.category}</p>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product stock:
        </label>
        <input
          type="text"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity of product"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
        ></input>
        {errors.quantity && (
          <p className="text-red-400 mb-4">{errors.quantity}</p>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product discount:
        </label>

        <input
          type="text"
          name="discount"
          value={newProduct.discount}
          onChange={handleChange}
          placeholder="Discount"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
        ></input>
        {errors.discount && (
          <p className="text-red-400 mb-4">{errors.discount}</p>
        )}

        {newProduct.discount.length ? (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Discount description:
            </label>
            <input
              type="text"
              name="description"
              value={discountt.description}
              onChange={handleDiscount}
              placeholder="Description of discount"
              className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
            ></input>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Discount percentage:
            </label>
            <input
              type="text"
              name="percent"
              value={discountt.percent}
              onChange={handleDiscount}
              placeholder="Quantity of product"
              className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
            ></input>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Discount status (0 = inactive; 1 = active):
            </label>
            <input
              type="number"
              name="active"
              value={discountt.active}
              onChange={handleDiscount}
              placeholder="Quantity of product"
              className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6"
            ></input>
          </>
        ) : (
          <></>
        )}
        <div className=" text-center">
          {!newProduct.name ? (
            <input
              type="submit"
              disabled
              className=" font-semibold  text-white border-solid bg-blue-900 border-2 border-blue-900 py-2 px-6 focus:outline-none  rounded "
            ></input>
          ) : errors.name ||
            errors.price ||
            errors.details ||
            errors.inInventary ||
            errors.category ? (
            <input
              type="submit"
              disabled
              className=" font-semibold  text-white border-solid bg-blue-900 border-2 border-blue-900 py-2 px-6 focus:outline-none  rounded "
            ></input>
          ) : (
            <input
              type="submit"
              className="cursor-pointer font-semibold  text-white border-solid bg-main border-2 border-main py-2 px-6 focus:outline-none hover:bg-blue-600 rounded hover:border-blue-600"
            ></input>
          )}
        </div>
      </form>
      {msg.error ? (
        <div className="absolute rounded-lg text-slate-800 font-display  ">
          <h2 className="fixed top-1/2 left-auto ml-60 text-2xl py-16 bg-red-400 rounded-lg px-8 ">
            {msg.error}
          </h2>
        </div>
      ) : msg.statusText ? (
        <div className="absolute rounded-lg ml-6 text-slate-800 font-display  ">
          <h2 className="fixed top-1/2 ml-96 text-2xl py-16 bg-green-400 rounded-lg px-8 ">
            {msg.statusText}
          </h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CreateComponent;
