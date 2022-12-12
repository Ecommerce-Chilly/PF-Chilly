import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getProductById,
  addToCart,
  updateCartQuantity,
  addFavorite,
  getFavorites,
  deleteFavorite,
  clearFavMsg,
  addToCartBack,
} from "../../../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  const produDetail = useSelector((state) => state.productDetail);
  const failMsg = useSelector((state) => state.searchProductMsg);
  const favoriteMsg = useSelector((state) => state.favoriteMsg);
  const { userInfo } = useSelector((state) => state);
  const favs = useSelector((state) => state.favorites);

  useEffect(() => {
    if (userInfo) {
      dispatch(getFavorites(userInfo.id, token));
    }
  }, [favoriteMsg]);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);
  useEffect(() => {
    return () => {
      dispatch(clearFavMsg());
    };
  }, []);

  function addCart(id) {
    dispatch(addToCart(id));
    dispatch(addToCartBack(userInfo.id, id));
    dispatch(updateCartQuantity());
  }

  return (
    <div className="w-5/6 m-auto">
      {produDetail.length > 0 ? (
        Object.keys(produDetail).length > 0 && (
          <div key={produDetail[0].id} className="flex row">
            <div>
              <div>
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                  <div className="container px-5 py-24 mx-auto">
                    <div className="mx-auto flex flex-wrap relative">
                      <Link
                        to={`/store`}
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
                      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm font-mono  title-font text-gray-500 tracking-widest mb-7">
                          {produDetail[0].brand}
                        </h2>
                        <h1 className="text-gray-900 font-display text-3xl title-font font-medium mb-1">
                          {produDetail[0].name}
                        </h1>

                        <p className="mb-10 mt-4 font-mono">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Modi, facilis nobis? Culpa fuga aspernatur
                          dolorum accusantium. Ducimus reiciendis voluptatem
                          temporibus id debitis. Architecto, dolorem corporis
                          aperiam et voluptas officiis omnis.
                        </p>

                        <div className="flex">
                          <span className="title-font font-medium text-4xl text-gray-900">
                            ${" "}
                            {produDetail[0].price == 0
                              ? 50
                              : produDetail[0].price}
                          </span>
                          <button
                            className="flex ml-auto font-semibold text-white bg-main border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                            onClick={() => addCart(produDetail[0].id)}
                          >
                            Add to cart
                          </button>

                          {userInfo.name ? (
                            favs.find((el) => el.id === produDetail[0].id) ? (
                              <button
                                onClick={() => {
                                  dispatch(
                                    deleteFavorite(
                                      {
                                        userId: userInfo.id,
                                        productId: produDetail[0].id,
                                      },
                                      token
                                    )
                                  );
                                }}
                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                              >
                                <svg
                                  fill="tomato"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  dispatch(
                                    addFavorite(
                                      {
                                        userId: userInfo.id,
                                        productId: produDetail[0].id,
                                      },
                                      token
                                    )
                                  );
                                }}
                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                              >
                                <svg
                                  fill="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                              </button>
                            )
                          ) : (
                            <>
                              <button
                                data-tip="Sign in to add Favourites!"
                                data-for="svgTooltip"
                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 cursor-default"
                              >
                                <svg
                                  fill="gray"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                              </button>
                              <ReactTooltip
                                id="svgTooltip"
                                place="top"
                                effect="solid"
                                textColor="#000"
                                backgroundColor="#ffffff"
                                border
                                borderColor="#303f9f"
                              />
                            </>
                          )}
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
        <p>{failMsg}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetail;
