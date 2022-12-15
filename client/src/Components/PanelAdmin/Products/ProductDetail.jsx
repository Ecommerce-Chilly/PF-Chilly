import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../PI Components/Loader/Loader.jsx";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const produDetail = useSelector((state) => state.productDetail);
  const failMsg = useSelector((state) => state.searchProductMsg);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div className="w-5/6 m-auto">
      {produDetail.length > 0 ? (
        Object.keys(produDetail).length > 0 && (
          <div key={produDetail[0].id} className="flex row">
            <div>
              <div>
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                  <div className="container px-5 py-24 mx-auto">
                    <div className=" mx-auto flex flex-wrap relative">
                      <Link
                        to={`/panel+admin/products`}
                        className="inline h-10 absolute -top-12 -left-6"
                      >
                        <button className=" font-semibold text-main py-2 px-6 focus:outline-none hover:underline ">
                          Back
                        </button>
                      </Link>

                      <img
                        alt="ecommerce"
                        className="lg:w-1/2 max-w-lg max-h-quinientos w-full object-contain object-center rounded border border-gray-200"
                        src={produDetail[0].image.replace("SL75", "SL700")}
                      />

                      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ">
                        <h2 className="text-sm font-mono title-font text-gray-500 tracking-widest mb-7">
                          {produDetail[0].brand}
                        </h2>
                        <h1 className="text-gray-900 text-3xl font-display title-font font-medium mb-1 ">
                          {produDetail[0].name}
                        </h1>

                        <div className="leading-relaxed font-mono">
                          <p className="my-3">
                            <span className="font-mono font-bold">
                              {" "}
                              Brand:{" "}
                            </span>{" "}
                            {produDetail[0].brand}
                          </p>
                          <p className="my-3">
                            <span className="font-mono font-bold">
                              {" "}
                              Model:{" "}
                            </span>{" "}
                            {produDetail[0].model}
                          </p>
                          <p className="my-3">
                            <span className="font-mono font-bold">
                              Category:{" "}
                            </span>{" "}
                            {produDetail[0].categoryName}
                          </p>
                          <p className="my-3">
                            <span className="font-mono font-bold">Stock: </span>
                            {produDetail[0].inventory.quantity}
                          </p>
                        </div>

                        <div className="flex">
                          <span className="title-font font-medium text-3xl text-gray-900">
                            $
                            {produDetail[0].price == 0
                              ? 50
                              : produDetail[0].price}
                          </span>
                        </div>
                        <div className="flex mt-5 justify-between">
                          <Link
                            to="/panel+admin/products"
                            className="flex font-semibold  text-white bg-main border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                          >
                            <button>Back to all Products</button>
                          </Link>
                          <Link
                            to={`/panel+admin/change/product/${produDetail[0].id}`}
                          >
                            <button className="flex font-semibold text-main border-solid border-main  border-2 py-2 px-6 focus:outline-none hover:bg-blue-100  rounded">
                              Edit Product
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )
      ) : !produDetail.length ? (
        <Loader/>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetail;
