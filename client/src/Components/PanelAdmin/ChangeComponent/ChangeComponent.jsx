import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  putProductById,
  getProductById,
  putInventory,
  putDiscount,
  clearProdMsg,
  allBrands,
  allCategories,
} from "../../../redux/actions/actions.js";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const { validate } = require("./utils");
import { Link } from "react-router-dom";
import ForbiddenAccess from "../ForbiddenAccess.jsx";

function ChangeComponent() {
  const { admin, brands, category } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetail);
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  const msg = useSelector((state) => state.productChangedMsg);
  const history = useHistory();

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(allBrands());
    dispatch(allCategories());
  }, [dispatch, id]);

  const [newProduct, setNewProduct] = useState({
    name: productDetails.length > 0 ? productDetails[0].name : "",
    price: productDetails.length > 0 ? productDetails[0].price : "",
    brand: productDetails.length > 0 ? productDetails[0].brand : "",
    model: productDetails.length > 0 ? productDetails[0].model : "",
    image: productDetails.length > 0 ? productDetails[0].image : "",
    quantity: "",
    category: productDetails.length > 0 ? productDetails[0].categoryName : "",
    details: [],
    discount:
      productDetails.length > 0
        ? productDetails[0].discountName
          ? productDetails[0].discountName
          : ""
        : "",
  });
  const [errors, setErrors] = useState({});
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

  function dispatchDataToChange(id, newProduct, discountt) {
    dispatch(putProductById(id, newProduct, token));
    dispatch(putInventory(id, newProduct, token));
    if (newProduct.discount) {
      dispatch(putDiscount(discountt, token));
    }
  }
  const creationStatusEdit = () => {
    console.log(msg);
    if (msg === "Sending incomplete information!") {
      Swal.fire({
        icon: "error",
        text: msg,
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
    } else if (msg === "Product successfully modified") {
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
          dispatch(clearProdMsg());
          history.push("/panel+admin/products");
        }
      });
    }
  };
  return (
    <>
      {admin === true ? (
        <div className="w-2/3 m-auto mb-9">
          {productDetails.length > 0 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatchDataToChange(
                  productDetails[0].id,
                  newProduct,
                  discountt
                );
                //setTimeout(() => history.push('/panel+admin/products'), 3000);
              }}
              className="w-2/3 m-auto mt-9"
            >
              <div className="form-header mb-5">
                <h1 className="text-3xl text-slate-800  text-center font-display font-semibold mt-12 ml-50 mb-5">
                  Edit product
                </h1>
                <Link
                  to="/panel+admin"
                  className="font-medium text-left text-main  "
                >
                  Back to Panel Admin
                </Link>
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                New Product name:
              </label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Type name here"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
              ></input>
              {errors.name && (
                <p className="text-red-400 mb-4">{errors.name}</p>
              )}
              <label className="block mb-2 text-sm font-medium text-gray-900">
                New Price:
              </label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Set a price"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
              ></input>
              {errors.price && (
                <p className="text-red-400 mb-4">{errors.price}</p>
              )}
              <label className="block mb-2 text-sm font-medium text-gray-900">
                New brand:
              </label>
              <select
                name="brand"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
                onChange={handleChange}
                value={newProduct.brand}
              >
                {brands?.map((e) => (
                  <option key={e} value={e}>
                    {e[0].toUpperCase() + e.substring(1)}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-red-400 mb-4">{errors.brand}</p>
              )}

              {newProduct.brand === "" ? (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    New model:
                  </label>
                  <input
                    className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
                    disabled
                    placeholder="Before insert a brand"
                  ></input>
                </>
              ) : newProduct.brand.length ? (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    New model:
                  </label>
                  <input
                    className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
                    name="model"
                    value={newProduct.model}
                    onChange={handleChange}
                    placeholder="Insert model"
                  ></input>
                  {errors.model && (
                    <p className="text-red-400 mb-4">{errors.model}</p>
                  )}
                </>
              ) : (
                <></>
              )}
              <label className="block mb-2 text-sm font-medium text-gray-900">
                New Product Img (URL):
              </label>
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
                placeholder="Image Product at here"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
              ></input>

              <label className="block mb-2 text-sm font-medium text-gray-900">
                New Product details:
              </label>
              <input
                type="text"
                name="brand"
                onChange={handleDetailChange}
                placeholder="Type brand here"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
              ></input>
              <input
                type="text"
                name="cosito"
                onChange={handleDetailChange}
                placeholder="Type cosito here"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
              ></input>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                New Product category:
              </label>
              <select
                name="category"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
                onChange={handleChange}
                value={newProduct.category}
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
                New Product stock:
              </label>
              <input
                type="text"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleChange}
                placeholder="Quantity of product"
                className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
              ></input>
              {errors.quantity && (
                <p className="text-red-400 mb-4">{errors.quantity}</p>
              )}
              {productDetails[0].discountName ? (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    New Product discount:
                  </label>
                  <input
                    type="text"
                    name="discount"
                    value={newProduct.discount}
                    onChange={handleChange}
                    placeholder="Discount at here :D"
                    className="bg-gray-50 border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 mb-6 "
                  ></input>
                  {errors.discount && (
                    <p className="text-red-400 mb-4">{errors.discount}</p>
                  )}
                </>
              ) : (
                <></>
              )}

              {newProduct.discount ? (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    New Discount description:
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
                    New Discount percentage:
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
                    New Discount status (0 = inactive; 1 = active):
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
                    onClick={creationStatusEdit()}
                  ></input>
                ) : (
                  <input
                    type="submit"
                    className="cursor-pointer font-semibold  text-white border-solid bg-main border-2 border-main py-2 px-6 focus:outline-none hover:bg-blue-600 rounded hover:border-blue-600"
                    onClick={creationStatusEdit()}
                  ></input>
                )}
              </div>
              {/* {msg ? <h2>{`${msg}`}</h2> : <></>} */}
            </form>
          ) : (
            <p>No se cargo correctamente</p>
          )}
        </div>
      ) : (
        <>
          <ForbiddenAccess />
        </>
      )}
    </>
  );
}

export default ChangeComponent;
