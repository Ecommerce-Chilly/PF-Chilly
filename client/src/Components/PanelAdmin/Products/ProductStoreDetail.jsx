import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getProductById,
  addToCart,
  updateCartQuantity,
  addFavorite,
  getFavorites,
  deleteFavorite,
  clearFavMsg,
  addToCartBack,
  putCartFromBack,
} from '../../../redux/actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Loader from '../../PI Components/Loader/Loader';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  token = JSON.parse(token);
  const produDetail = useSelector((state) => state.productDetail);
  const failMsg = useSelector((state) => state.searchProductMsg);
  const favoriteMsg = useSelector((state) => state.favoriteMsg);
  const userInfo = useSelector((state) => state.userInfo);
  const backendCart = useSelector((state) => state.backendCart);
  const favs = useSelector((state) => state.favorites);
  const [itemQuantity, setItemQuantity] = useState(1);
  let cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (userInfo.id && token) {
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
    const productInCart = cart.find((product) => product.id === id);
    const previousQuantity = productInCart?.quantity || 0;

    for (let index = 0; index < itemQuantity; index++) {
      dispatch(addToCart(id));
    }

    dispatch(updateCartQuantity());
    if (userInfo.id) {
      const cartId = backendCart[0]?.id || userInfo.id;
      const syncCart = productInCart
        ? putCartFromBack(cartId, id, previousQuantity + itemQuantity)
        : addToCartBack(cartId, id, itemQuantity);

      dispatch(syncCart);
    }
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
                        src={produDetail[0].image.replace('SL75', 'SL700')}
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

                        <div className="flex justify-between relative">
                          <span className="title-font font-medium text-4xl text-gray-900">
                            €{' '}
                            {produDetail[0].price == 0
                              ? 50
                              : produDetail[0].price}
                          </span>
                          <div className="flex absolute right-14">
                            <div className=" flex text-base flex-row items-center mr-9  ">
                              <button
                                value="-"
                                onClick={() =>
                                  itemQuantity > 1
                                    ? setItemQuantity(itemQuantity - 1)
                                    : null
                                }
                                className="font-semibold w-9 rounded  text-center cursor-pointer text-lg hover:bg-main hover:text-white"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="focus:outline-none bg-gray-100  h-6 w-10  rounded text-center  px-2 mx-2 text-lg"
                                value={itemQuantity}
                                disabled
                              />
                              <button
                                value="+"
                                onClick={() =>
                                  setItemQuantity(itemQuantity + 1)
                                }
                                className="font-semibold w-9 rounded  text-center cursor-pointer text-lg hover:bg-main hover:text-white"
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="flex ml-auto font-semibold text-white bg-main border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                              onClick={() => addCart(produDetail[0].id)}
                            >
                              {cart.find((e) => e.id === produDetail[0].id)
                                ? `Add ${itemQuantity} more`
                                : 'Add to cart'}
                            </button>
                          </div>

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
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
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
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
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
                                data-tooltip-content="Sign in to add Favourites!"
                                data-tooltip-id="svgTooltip"
                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 cursor-default"
                              >
                                <svg
                                  fill="gray"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                              </button>
                              <Tooltip
                                id="svgTooltip"
                                place="top"
                                className="!text-black !bg-white !opacity-100 !border !border-[#303f9f]"
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
        <Loader/>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetail;
