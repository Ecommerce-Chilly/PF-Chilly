import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createProduct,
  createDiscount,
  clearProdMsg,
  allBrands,
  allCategories,
} from "../../../redux/actions/actions.js";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ForbiddenAccess from "../ForbiddenAccess.jsx";
import UploadImages from "../../UploadImages/UploadImages.jsx";

const { validate } = require("../ChangeComponent/utils");

function CreateComponent() {
  const { admin, brands, category } = useSelector((state) => state);
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.createProductMsg);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    dispatch(allBrands());
    dispatch(allCategories());
  }, []);
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    brand: "",
    model: "",
    image: "",
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

  function catchImage(image) {
    setNewProduct({ ...newProduct, image: image });
  }

  const handleDetailChange = (e) => {
    setNewProduct({
      ...newProduct,
      details: [{ ...newProduct.details[0], [e.target.name]: e.target.value }],
    });
  };

  function dispatchDataToCreateAndDiscount(newProduct, discountt) {
    dispatch(createProduct(newProduct, token));
    dispatch(createDiscount(discountt, token));
  }

  const creationStatus = () => {
    if (msg.error) {
      Swal.fire({
        icon: "error",
        text: msg.error,
        confirmButtonText: "Retry",
        customClass: {
          container: "popup-container",
          popup: "popup",
          confirmButton: "confirm",
          denyButton: "deny",
          cancelButton: "cancel",
        },
      }).then((r) => {
        dispatch(clearProdMsg());
      });
    } else if (msg) {
      Swal.fire({
        icon: "success",
        text: msg,
        confirmButtonText: "Great!",
        customClass: {
          container: "popup-container",
          popup: "popup",
          confirmButton: "confirm",
          denyButton: "deny",
          cancelButton: "cancel",
        },
      }).then((r) => {
        if (r.isConfirmed) {
          history.push("/panel+admin/products");
        }
      });
    }
  };

  return (
    <div className="w-2/3 m-auto mb-9">
      {admin === true ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatchDataToCreateAndDiscount(newProduct, discountt);
          }}
          className="w-2/3 m-auto mt-9"
        >
          <div className="form-header mb-5">
            <h1 className="text-3xl text-slate-800  text-center font-display font-semibold mt-12 ml-50 mb-5">
              Create Product
            </h1>
            <Link
              to="/panel+admin"
              className="font-medium text-left text-main  "
            >
              Back to Panel Admin
            </Link>
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
            {brands?.map((e) => (
              <option key={e} value={e}>
                {e[0].toUpperCase() + e.substring(1)}
              </option>
            ))}
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
            Product Img:
          </label>

          <UploadImages catchImage={catchImage} />

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
            {category?.map((e) => (
              <option key={e} value={e}>
                {e[0].toUpperCase() + e.substring(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-400 mb-4">{errors.category}</p>
          )}

          <label className="block mb-2 text-sm font-medium text-gray-900">
            Product stock:
          </label>
          <input
            type="number"
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
                onClick={creationStatus()}
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
                onClick={creationStatus()}
              ></input>
            ) : (
              <input
                type="submit"
                className="cursor-pointer font-semibold  text-white border-solid bg-main border-2 border-main py-2 px-6 focus:outline-none hover:bg-blue-600 rounded hover:border-blue-600"
                onClick={creationStatus()}
              ></input>
            )}
          </div>
        </form>
      ) : (
        <>
          <ForbiddenAccess />
        </>
      )}
    </div>
  );
}

export default CreateComponent;
