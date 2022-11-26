import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';

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
            {/* <div>
              <img src={produDetail[0].image} alt={produDetail[0].name} />
            </div>
            <div>
              <p> {produDetail[0].name}</p>
              <p> Price:{produDetail[0].price} </p>
              <p> Brand: {produDetail[0].brand}</p>
              <p> Model: {produDetail[0].model}</p>
              <p> Category: {produDetail[0].categoryName}</p>
              <p> Stock: {produDetail[0].inventory.quantity}</p>
            </div>
            <Link to={`/panel+admin/change/product/${produDetail[0].id}`}>
              <button>Want to change product? Click here!</button>
            </Link> */}
            <div>
              <div>
                <section class="text-gray-700 body-font overflow-hidden bg-white">
                  <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                      <img
                        alt="ecommerce"
                        class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                        src={produDetail[0].image.replace('SL75', 'SL700')}
                      />
                      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 class="text-sm font-mono title-font text-gray-500 tracking-widest mb-7">
                          {produDetail[0].brand}
                        </h2>
                        <h1 class="text-gray-900 text-3xl font-display title-font font-medium mb-1">
                          {produDetail[0].name}
                        </h1>

                        <div class="leading-relaxed font-mono">
                          <p className="my-3">
                            <span className="font-mono font-bold">
                              {' '}
                              Brand:{' '}
                            </span>{' '}
                            {produDetail[0].brand}
                          </p>
                          <p className="my-3">
                            <span className="font-mono font-bold">
                              {' '}
                              Model:{' '}
                            </span>{' '}
                            {produDetail[0].model}
                          </p>
                          <p className="my-3">
                            <span className="font-mono font-bold">
                              Category:{' '}
                            </span>{' '}
                            {produDetail[0].categoryName}
                          </p>
                          <p className="my-3">
                            <span className="font-mono font-bold">Stock: </span>
                            {produDetail[0].inventory.quantity}
                          </p>
                        </div>

                        <div class="flex">
                          <span class="title-font font-medium text-3xl text-gray-900">
                            $
                            {produDetail[0].price == 0
                              ? 50
                              : produDetail[0].price}
                          </span>

                          {/* <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                            <svg
                              fill="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              class="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                          </button> */}
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
        <p>{failMsg}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetail;
