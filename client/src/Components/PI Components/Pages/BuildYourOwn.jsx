import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  addToBuild,
  deleteFromBuild,
  byoToCart,
  updateCartQuantity,
  clearBYO,
  noFooter,
  hideFooter,
  getProduct,
  addToCart,
  addToCartBack,
} from '../../../redux/actions/actions';

import { useState } from 'react';
import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

function BuildYourOwn() {
  let history = useHistory();
  let byo = useSelector((state) => state.build);
  let userInfo = useSelector((state) => state.userInfo);
  console.log(byo);
  let products = useSelector((state) => state.allProduct);
  let dispatch = useDispatch();
  let [i, setI] = useState(-1);
  let categories = [
    'processors',
    'motherboards',
    'cpu_fan',
    'ram',
    'gpus',
    'storage',
    'power_supply',
    'cases',
    'case_fan',
    'mouses',
    'keyboards',
  ];
  let totalPrice = 0;
  let [firstLetter, setFirstLetter] = useState('');

  for (let i = 1; i < byo.length; i++) {
    byo[i].price ? (totalPrice = totalPrice + byo[i].price) : null;
  }

  useEffect(() => {
    dispatch(getProduct());
    dispatch(noFooter());
    setI(byo.length - 1);
    return () => {
      dispatch(hideFooter());
    };
  }, []);

  function addCart() {
    if (userInfo.id) {
      for (let index = 0; index < byo.length; index++) {
        byo[index].id
          ? dispatch(addToCartBack(userInfo.id, byo[index].id, 1))
          : null;
      }
    }
  }

  useEffect(() => {
    console.log(i);
    console.log(categories[i]);
    if (byo[0]) {
      if (byo[0].name === 'amd') {
        setFirstLetter('A');
      } else {
        setFirstLetter('L');
      }
    }
    console.log(firstLetter);
  }, [i]);
  return (
    <div className="mb-48">
      {i < 0 ? (
        <div>
          <h1 className="text-slate-800 text-3xl font-display font-semibold mt-12 ml-60 mb-9">
            Build your own PC!
          </h1>
          <p className="mt-12 ml-60 mb-9 font-display">
            Building your own PC is a rewarding experience. We'll help you to be
            sure that the compatibility of your selected PC parts is just right.
          </p>
        </div>
      ) : null}

      <div className="flex fixed  flex-col bottom-0  z-20 bg-white w-full">
        <div className="w-full text-white flex justify-between">
          {i < categories.length + 1 && i > -1 ? (
            <button
              onClick={() => {
                dispatch(deleteFromBuild());
                setI(i - 1);
              }}
              className="  w-2/5 h-12 bg-main border-r-2 rounded border-white hover:bg-blue-700"
            >
              Back
            </button>
          ) : null}
          {i < categories.length + 1 && i > -1 ? (
            <div className="  w-2/5 h-12 bg-white border-2 rounded border-main flex">
              <p className="my-auto mx-auto text-center text-slate-900 font-display font-medium">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
            </div>
          ) : null}
          {i < categories.length && i > -1 ? (
            <button
              onClick={() => {
                setI(i + 1);
                dispatch(addToBuild({}));
              }}
              className=" w-2/5 h-12 bg-main border-l-2 rounded border-white hover:bg-blue-700"
            >
              Skip
            </button>
          ) : i === categories.length ? (
            <button
              onClick={() => {
                dispatch(byoToCart(byo));
                addCart();
                dispatch(updateCartQuantity());
                dispatch(clearBYO());
                setI(-1);
                history.push('/cart');
              }}
              className="w-2/5 h-12 bg-main border-l-2 rounded border-white hover:bg-blue-700 relative"
            >
              Add to Cart{' '}
              <div className="w-20 absolute right-1/2 -top-20">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 392.652 392.652"
                  fill="rgb(48, 63, 159)"
                  stroke-linecap="round"
                >
                  <g>
                    <path
                      stroke-width="1"
                      stroke-linecap="round"
                      d="M371.439,243.7l-35.961,35.961c11.209-92.047-39.457-184.193-129.211-221.371c-34.202-14.167-71.578-19.149-108.094-14.425
	C62.773,48.452,28.825,62.018,0,83.1l17.709,24.215c51.74-37.839,117.938-45.807,177.078-21.308
	c85.411,35.379,129.596,128.751,105.878,215.706L242.652,243.7l-21.213,21.213l85.606,85.606l85.606-85.606L371.439,243.7z"
                    />
                  </g>
                </svg>
              </div>
            </button>
          ) : null}
        </div>
        <div className="flex m-auto bg-white">
          <div className="border-2 w-32 h-32 flex">
            {byo[1] && byo[1].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[1].name}
                  data-for="divTooltip1"
                >
                  <img src={byo[1].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip1"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-16 m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  className="w-28 h-28 m-auto "
                  viewBox="0 0 43.43 42.85"
                  fill="rgb(56,56,56)"
                >
                  <style type="text/css"></style>
                  <defs></defs>
                  <g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M41.03,42.85h-9.69v-0.87c0-0.62-0.58-0.82-1.09-0.88v1.75H2.4c-1.33,0-2.4-1.08-2.4-2.4V2.4C0,1.08,1.08,0,2.4,0h38.62c1.33,0,2.4,1.08,2.4,2.4v38.04C43.43,41.77,42.35,42.85,41.03,42.85z M32.93,41.1h8.1c0.36,0,0.66-0.29,0.66-0.66V2.4c0-0.36-0.29-0.66-0.66-0.66H2.4c-0.36,0-0.66,0.29-0.66,0.66v38.04c0,0.36,0.29,0.66,0.66,0.66h26.09v-1.68l0.8-0.07c0.19-0.02,0.38-0.03,0.57-0.03C31.58,39.33,32.57,40.13,32.93,41.1z"
                      ></path>
                    </g>
                    <g>
                      <g>
                        <rect
                          x="5.17"
                          y="9.91"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="5.17"
                          y="14.06"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="5.17"
                          y="18.22"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="5.17"
                          y="22.37"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="5.17"
                          y="26.52"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="5.17"
                          y="30.68"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                    </g>
                    <g>
                      <g>
                        <rect
                          x="34.8"
                          y="9.91"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="34.8"
                          y="14.06"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="34.8"
                          y="18.22"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="34.8"
                          y="22.37"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="34.8"
                          y="26.52"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="34.8"
                          y="30.68"
                          class="arma-item-fill"
                          width="3.46"
                          height="1.75"
                        ></rect>
                      </g>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M18.64,26.44c-2.09-0.05-3.58-0.84-4.11-2.17c-0.48-1.2-0.09-2.6,1.1-3.96c1.05-1.2,2.63-2.26,4.46-2.99l0.65,1.63c-1.57,0.62-2.92,1.52-3.78,2.51c-0.72,0.83-1.01,1.62-0.79,2.17c0.25,0.63,1.2,1.03,2.53,1.06L18.64,26.44z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M23.34,25.52L22.7,23.9c3.18-1.26,5.04-3.51,4.57-4.68c-0.25-0.63-1.19-1.03-2.52-1.06l0.04-1.75c2.08,0.05,3.58,0.84,4.11,2.17C29.81,20.87,27.37,23.92,23.34,25.52z"
                      ></path>
                    </g>
                    <g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M35.67,35.38H29.6l-0.28-1.2h-1.67l-0.28,1.2H7.76V7.47h6.07l0.28,1.2h1.67l0.28-1.2h19.62V35.38z M31,33.63h2.93V9.22H17.44l-0.28,1.2h-4.45l-0.28-1.2H9.51v24.41h16.48l0.28-1.2h4.45L31,33.63z"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <rect
                        x="11.22"
                        y="34.5"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="14.34"
                        y="34.5"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="17.46"
                        y="34.5"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="20.58"
                        y="34.5"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="31.19"
                        y="6.41"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="28.35"
                        y="6.41"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="25.5"
                        y="6.41"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="22.66"
                        y="6.41"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="19.82"
                        y="6.41"
                        class="arma-item-fill"
                        width="1.75"
                        height="1.93"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="23.54"
                        y="10.78"
                        class="arma-item-fill"
                        width="8.53"
                        height="1.75"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="19.02"
                        y="10.78"
                        class="arma-item-fill"
                        width="2.43"
                        height="1.75"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="12.1"
                        y="29.88"
                        class="arma-item-fill"
                        width="2.62"
                        height="1.75"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="17.61"
                        y="29.88"
                        class="arma-item-fill"
                        width="7.16"
                        height="1.75"
                      ></rect>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[2] && byo[2].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[2].name}
                  data-for="divTooltip2"
                >
                  <img src={byo[2].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip2"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-20  m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 44 36.63"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <defs></defs>
                  <g>
                    <g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M44,34.39H0V26.7h0.88v-1.72H0V2.49h44v5.15h-1.45v3.19H44V34.39z M1.69,32.7h40.62V12.53h-1.45V5.95h1.45V4.18H1.69v19.1h0.88v5.11H1.69V32.7z"
                        ></path>
                      </g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="9.14,3.34 7.44,3.34 7.44,1.69 5.63,1.69 5.63,3.34 3.93,3.34 3.93,0 9.14,0 "
                        ></polygon>
                      </g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="15.69,3.34 14,3.34 14,1.69 12.18,1.69 12.18,3.34 10.49,3.34 10.49,0 15.69,0 "
                        ></polygon>
                      </g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="22.24,3.34 20.55,3.34 20.55,1.69 18.73,1.69 18.73,3.34 17.04,3.34 17.04,0 22.24,0 "
                        ></polygon>
                      </g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="35.99,36.63 26.52,36.63 26.52,33.55 28.21,33.55 28.21,34.94 34.3,34.94 34.3,33.55 35.99,33.55 "
                        ></polygon>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M36.48,29.62H26.02V19.16h10.46V29.62z M27.72,27.92h7.07v-7.07h-7.07V27.92z"
                        ></path>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="27.18"
                            y="17.99"
                            class="arma-item-fill"
                            width="1.69"
                            height="2.02"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="30.41"
                            y="17.99"
                            class="arma-item-fill"
                            width="1.69"
                            height="2.02"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="33.63"
                            y="17.99"
                            class="arma-item-fill"
                            width="1.69"
                            height="2.02"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="35.64"
                            y="20.32"
                            class="arma-item-fill"
                            width="2.02"
                            height="1.69"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="35.64"
                            y="23.54"
                            class="arma-item-fill"
                            width="2.02"
                            height="1.69"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="35.64"
                            y="26.76"
                            class="arma-item-fill"
                            width="2.02"
                            height="1.69"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="33.63"
                            y="28.77"
                            class="arma-item-fill"
                            width="1.69"
                            height="2.02"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="30.41"
                            y="28.77"
                            class="arma-item-fill"
                            width="1.69"
                            height="2.02"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="27.18"
                            y="28.77"
                            class="arma-item-fill"
                            width="1.69"
                            height="2.02"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <rect
                            x="24.85"
                            y="26.76"
                            class="arma-item-fill"
                            width="2.02"
                            height="1.69"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="24.85"
                            y="23.54"
                            class="arma-item-fill"
                            width="2.02"
                            height="1.69"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="24.85"
                            y="20.32"
                            class="arma-item-fill"
                            width="2.02"
                            height="1.69"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M22.6,15H4.54V6.68H22.6V15z M6.24,13.31h14.67V8.37H6.24V13.31z"
                        ></path>
                      </g>
                      <g>
                        <rect
                          x="5.39"
                          y="9.99"
                          class="arma-item-fill"
                          width="16.36"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M26.72,10.98c-1.19,0-2.15-0.97-2.15-2.15c0-1.19,0.97-2.15,2.15-2.15c1.19,0,2.15,0.97,2.15,2.15C28.88,10.02,27.91,10.98,26.72,10.98z M26.72,8.37c-0.25,0-0.46,0.21-0.46,0.46c0,0.25,0.21,0.46,0.46,0.46c0.25,0,0.46-0.21,0.46-0.46C27.18,8.57,26.98,8.37,26.72,8.37z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M36.65,15.89c-1.19,0-2.15-0.97-2.15-2.15s0.97-2.15,2.15-2.15c1.19,0,2.15,0.97,2.15,2.15S37.83,15.89,36.65,15.89z M36.65,13.28c-0.25,0-0.46,0.21-0.46,0.46s0.21,0.46,0.46,0.46c0.25,0,0.46-0.21,0.46-0.46S36.9,13.28,36.65,13.28z"
                        ></path>
                      </g>
                      <g>
                        <rect
                          x="20.48"
                          y="17.14"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="25.42"
                          y="13.31"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="29.94"
                          y="13.31"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="30.34"
                          y="23.54"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="16.97"
                          y="17.14"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="20.48"
                          y="19.84"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="16.97"
                          y="19.84"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="20.48"
                          y="22.53"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <rect
                          x="16.97"
                          y="22.53"
                          class="arma-item-fill"
                          width="1.83"
                          height="1.69"
                        ></rect>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M39.19,10.98h-8.27V6.68h8.27V10.98z M32.61,9.29h4.89V8.37h-4.89V9.29z"
                        ></path>
                      </g>
                      <g>
                        <g>
                          <path
                            class="arma-item-fill"
                            d="M8.83,30.61H4.32v-6.27h4.52V30.61z M6.01,28.91h1.13v-2.89H6.01V28.91z"
                          ></path>
                        </g>
                        <g>
                          <rect
                            x="5.73"
                            y="23.7"
                            class="arma-item-fill"
                            width="1.69"
                            height="1.48"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="5.73"
                            y="29.83"
                            class="arma-item-fill"
                            width="1.69"
                            height="1.48"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            class="arma-item-fill"
                            d="M15,30.57h-4.52V24.3H15V30.57z M12.18,28.88h1.13v-2.89h-1.13V28.88z"
                          ></path>
                        </g>
                        <g>
                          <rect
                            x="11.9"
                            y="23.66"
                            class="arma-item-fill"
                            width="1.69"
                            height="1.48"
                          ></rect>
                        </g>
                        <g>
                          <rect
                            x="11.9"
                            y="29.8"
                            class="arma-item-fill"
                            width="1.69"
                            height="1.48"
                          ></rect>
                        </g>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M13.59,22.41H4.51V17.6h9.08V22.41z M6.21,20.72h5.69v-1.43H6.21V20.72z"
                        ></path>
                      </g>
                      <g>
                        <rect
                          x="16.97"
                          y="29.12"
                          class="arma-item-fill"
                          width="5.34"
                          height="1.69"
                        ></rect>
                      </g>
                    </g>
                    <g>
                      <rect
                        x="20.55"
                        y="33.55"
                        class="arma-item-fill"
                        width="1.69"
                        height="2.24"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="17.04"
                        y="33.55"
                        class="arma-item-fill"
                        width="1.69"
                        height="2.24"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="13.53"
                        y="33.55"
                        class="arma-item-fill"
                        width="1.69"
                        height="2.24"
                      ></rect>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[3] && byo[3].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[3].name}
                  data-for="divTooltip3"
                >
                  <img src={byo[3].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip3"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-24 m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 700 700"
                  className="w-28 h-28 mx-auto mt-3 flex"
                  fill="rgb(56,56,56)"
                >
                  <g>
                    <path d="m525 70h-35v-23.332c0-6.4414-5.2266-11.668-11.668-11.668h-46.668c-6.4414 0-11.668 5.2266-11.668 11.668v23.332h-140v-23.332c0-6.4414-5.2266-11.668-11.668-11.668h-46.668c-6.4414 0-11.668 5.2266-11.668 11.668v23.332h-34.996c-6.4414 0-11.668 5.2266-11.668 11.668v350c0 6.4414 5.2266 11.668 11.668 11.668h46.668v11.668c0 28.164 20.078 51.73 46.668 57.156l-0.003907 12.84c0 6.4414 5.2266 11.668 11.668 11.668h140c6.4414 0 11.668-5.2266 11.668-11.668v-12.844c26.59-5.4258 46.668-28.98 46.668-57.156v-11.668h46.668c6.4414 0 11.668-5.2266 11.668-11.668l-0.003906-350c0-6.4414-5.2266-11.668-11.668-11.668zm-81.668-11.668h23.332v11.668h-23.332zm-210 0h23.332v11.668h-23.332zm-46.664 35h73.16c-30.754 17.047-56.129 42.562-73.16 73.34zm0 326.67v-73.242c17.035 30.754 42.441 56.199 73.184 73.242zm221.66 93.332h-116.66v-23.332h116.67zm46.668-58.332c0 15.191-9.7891 28.023-23.332 32.852v-9.5195c0-6.4414-5.2266-11.668-11.668-11.668l-140 0.003907c-6.4414 0-11.668 5.2266-11.668 11.668v9.5195c-13.547-4.8281-23.332-17.664-23.332-32.852v-11.668h210zm58.332-35h-73.254c30.789-17.047 56.211-42.523 73.254-73.324zm-163.33 0c-90.066 0-163.33-73.266-163.33-163.33 0-90.066 73.266-163.34 163.33-163.34s163.33 73.266 163.33 163.33c0 90.07-73.266 163.34-163.33 163.34zm163.33-253.36c-17.047-30.801-42.488-56.258-73.289-73.301l73.289-0.003907zm-163.33-49.969c-77.199 0-140 62.801-140 140s62.801 140 140 140 140-62.801 140-140-62.801-140-140-140zm54.156 36.762c10.781 5.6836 20.559 12.961 29.027 21.582 12.879 13.695 12.691 35.27-0.6875 48.66-6.6133 6.6133-15.398 10.254-24.758 10.254-9.3438 0-18.129-3.6406-24.746-10.254-0.058594-0.058594-0.14063-0.082031-0.19922-0.14062-0.058594-0.058594-0.14062-0.10547-0.21094-0.16406 3.0664-2.0781 5.9727-4.4336 8.6562-7.1172 11.027-11.023 17.094-25.664 17.094-41.25 0-7.6289-1.5039-14.898-4.1758-21.57zm-54.156-13.43h0.070312c19.273 0.035156 34.93 15.727 34.93 35 0 9.3555-3.6406 18.141-10.254 24.758-6.6055 6.6016-15.391 10.242-24.746 10.242h-0.023438c-0.16406 0-0.31641 0.046875-0.46484 0.046875 0.69922-3.6289 1.0859-7.3516 1.0859-11.129 0-15.586-6.0664-30.227-17.09-41.254-5.4258-5.4258-11.668-9.5195-18.328-12.355 10.996-3.4414 22.688-5.3086 34.82-5.3086zm23.332 116.67c0 12.867-10.465 23.332-23.332 23.332s-23.332-10.465-23.332-23.332c0-12.867 10.465-23.332 23.332-23.332 12.867-0.003907 23.332 10.461 23.332 23.332zm-104.99-83.184c13.695-12.879 35.27-12.691 48.66 0.6875 6.6133 6.6133 10.254 15.398 10.254 24.758 0 9.3438-3.6406 18.129-10.254 24.746-0.058594 0.058594-0.082031 0.14062-0.14062 0.19922-0.058593 0.058594-0.10547 0.14062-0.16406 0.21094-2.0781-3.0664-4.4336-5.9727-7.1172-8.6562-11.02-11.031-25.66-17.098-41.25-17.098-7.6172 0-14.898 1.4922-21.57 4.1641 5.6719-10.766 12.961-20.555 21.582-29.012zm-17.336 99.691c-5.4258 5.4258-9.5195 11.668-12.355 18.328-3.4531-11.016-5.3203-22.703-5.3203-34.836v-0.070313c0.035157-19.273 15.727-34.93 35-34.93 9.3555 0 18.141 3.6406 24.758 10.254 6.6016 6.6016 10.242 15.387 10.242 24.746v0.023437c0 0.16406 0.046875 0.31641 0.046875 0.46484-3.6289-0.69922-7.3516-1.0859-11.129-1.0859-15.586 0.011719-30.227 6.0781-41.242 17.105zm44.836 86.73c-10.781-5.6836-20.559-12.961-29.027-21.582-12.879-13.695-12.691-35.27 0.6875-48.66 6.6133-6.6133 15.398-10.254 24.758-10.254 9.3438 0 18.129 3.6406 24.746 10.254 0.058594 0.058594 0.14063 0.082032 0.19922 0.14063 0.058594 0.058593 0.14062 0.10547 0.21094 0.16406-3.0664 2.0781-5.9727 4.4336-8.6562 7.1172-11.027 11.02-17.094 25.66-17.094 41.246 0 7.6328 1.5039 14.898 4.1758 21.574zm54.156 13.426h-0.070312c-19.273-0.035156-34.93-15.727-34.93-35 0-9.3555 3.6406-18.141 10.254-24.758 6.6055-6.6016 15.391-10.242 24.746-10.242h0.023438c0.16406 0 0.31641-0.046875 0.46484-0.046875-0.69922 3.6289-1.0859 7.3516-1.0859 11.129 0 15.586 6.0664 30.227 17.09 41.254 5.4258 5.4258 11.668 9.5195 18.328 12.355-10.996 3.4414-22.688 5.3086-34.82 5.3086zm81.668-33.48c-13.695 12.879-35.27 12.691-48.66-0.6875-6.6133-6.6133-10.254-15.398-10.254-24.758 0-9.3438 3.6406-18.129 10.254-24.746 0.058594-0.058594 0.082032-0.14062 0.14063-0.19922 0.058593-0.058594 0.10547-0.14063 0.16406-0.21094 2.0781 3.0664 4.4336 5.9727 7.1172 8.6562 11.008 11.027 25.66 17.094 41.238 17.094 7.6172 0 14.887-1.4922 21.57-4.1641-5.6719 10.766-12.961 20.555-21.57 29.016zm29.68-118.02c3.4531 11.016 5.3203 22.707 5.3203 34.84v0.070312c-0.035157 19.273-15.727 34.93-35 34.93-9.3555 0-18.141-3.6406-24.758-10.254-6.6016-6.6055-10.242-15.391-10.242-24.746v-0.035157c0-0.16406-0.046875-0.30469-0.046875-0.46484 3.6289 0.69922 7.3516 1.0859 11.129 1.0859 15.586 0 30.227-6.0664 41.254-17.09 5.4141-5.418 9.5078-11.672 12.344-18.336z" />
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[4] && byo[4].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[4].name}
                  data-for="divTooltip4"
                >
                  <img src={byo[4].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip4"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-20  m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 50 20.6"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <defs></defs>
                  <g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M50,20.6H25.26v-1.06c0-0.15-0.12-0.26-0.26-0.26c-0.15,0-0.26,0.12-0.26,0.26v1.06H0v-6.55h10.97v2.13H2.13v2.29h20.74c0.39-0.79,1.2-1.33,2.14-1.33c0.94,0,1.75,0.54,2.14,1.33h20.74v-2.29H14.46v-2.13H50V20.6z"
                      ></path>
                    </g>
                    <g>
                      <polygon
                        class="arma-item-fill"
                        points="50,15.21 47.87,15.21 47.87,10.79 46.81,10.79 46.81,5.95 47.87,5.95 47.87,2.13 29.13,2.13 29.13,0 50,0 50,8.07 48.94,8.07 48.94,8.66 50,8.66 "
                      ></polygon>
                    </g>
                    <g>
                      <polygon
                        class="arma-item-fill"
                        points="2.13,15.21 0,15.21 0,8.66 1.06,8.66 1.06,8.07 0,8.07 0,0 20.87,0 20.87,2.13 2.13,2.13 2.13,5.95 3.19,5.95 3.19,10.79 2.13,10.79 "
                      ></polygon>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M12.82,12.73H7.12V3.63h5.71V12.73z M9.24,10.61h1.45V5.75H9.24V10.61z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M22.73,12.73h-5.71V3.63h5.71V12.73z M19.15,10.61h1.45V5.75h-1.45V10.61z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M32.63,12.73h-5.71V3.63h5.71V12.73z M29.05,10.61h1.45V5.75h-1.45V10.61z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M42.53,12.73h-5.71V3.63h5.71V12.73z M38.95,10.61h1.45V5.75h-1.45V10.61z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="22.68"
                        class="arma-item-fill"
                        width="4.95"
                        height="2.13"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="43.99"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="40.41"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="36.83"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="33.25"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="29.67"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="18.39"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="14.81"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="11.23"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="7.65"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="4.07"
                        y="17.33"
                        class="arma-item-fill"
                        width="2.13"
                        height="2.21"
                      ></rect>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[5] && byo[5].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[5].name}
                  data-for="divTooltip5"
                >
                  <img src={byo[5].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip5"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-20 m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 46 34.54"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <defs></defs>
                  <g>
                    <g>
                      <polygon
                        class="arma-item-fill"
                        points="13.95,32.18 5.26,32.18 5.26,30.4 13.65,30.4 16.63,28.11 39.06,28.11 41.85,26.03 41.85,8.59 39.06,6.51 16.63,6.51 13.65,4.22 5.26,4.22 5.26,2.44 14.25,2.44 17.23,4.74 39.65,4.74 43.62,7.7 43.62,26.92 39.65,29.88 17.23,29.88 14.25,32.18 "
                      ></polygon>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M15.37,26.52c-5.08,0-9.21-4.13-9.21-9.21c0-5.08,4.13-9.21,9.21-9.21c5.08,0,9.21,4.13,9.21,9.21C24.58,22.39,20.45,26.52,15.37,26.52z M15.37,9.87c-4.1,0-7.44,3.34-7.44,7.44c0,4.1,3.34,7.44,7.44,7.44c4.1,0,7.44-3.34,7.44-7.44C22.8,13.21,19.47,9.87,15.37,9.87z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M15.37,20.83c-1.94,0-3.52-1.58-3.52-3.52c0-1.94,1.58-3.52,3.52-3.52c1.94,0,3.52,1.58,3.52,3.52C18.89,19.25,17.31,20.83,15.37,20.83z M15.37,15.56c-0.96,0-1.75,0.78-1.75,1.75c0,0.96,0.78,1.75,1.75,1.75c0.96,0,1.75-0.78,1.75-1.75C17.11,16.35,16.33,15.56,15.37,15.56z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="11.41"
                        y="11.67"
                        transform="matrix(0.5534 -0.8329 0.8329 0.5534 -3.6045 18.4032)"
                        class="arma-item-fill"
                        width="7.9"
                        height="1.78"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="18.66"
                        y="11.1"
                        transform="matrix(0.0927 -0.9957 0.9957 0.0927 2.7451 33.118)"
                        class="arma-item-fill"
                        width="1.78"
                        height="7.9"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="18.45"
                        y="15.97"
                        transform="matrix(0.9207 -0.3902 0.3902 0.9207 -6.2391 9.1225)"
                        class="arma-item-fill"
                        width="1.78"
                        height="7.9"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="11"
                        y="21.15"
                        transform="matrix(0.6259 -0.7799 0.7799 0.6259 -11.5951 19.903)"
                        class="arma-item-fill"
                        width="7.9"
                        height="1.78"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="10.12"
                        y="15.23"
                        transform="matrix(0.1818 -0.9833 0.9833 0.1818 -9.858 26.5188)"
                        class="arma-item-fill"
                        width="1.78"
                        height="7.9"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="10.76"
                        y="10.41"
                        transform="matrix(0.9521 -0.3059 0.3059 0.9521 -3.8325 4.2518)"
                        class="arma-item-fill"
                        width="1.78"
                        height="7.9"
                      ></rect>
                    </g>
                    <g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="42.73,12.08 36.43,12.08 34.9,10.11 24.23,10.11 24.23,8.33 35.77,8.33 37.3,10.3 42.73,10.3 "
                        ></polygon>
                      </g>
                      <g>
                        <rect
                          x="26.86"
                          y="13.04"
                          class="arma-item-fill"
                          width="2.67"
                          height="1.78"
                        ></rect>
                      </g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="42.72,16.82 39.06,16.77 37.53,14.81 31.82,14.81 31.82,13.04 38.4,13.04 39.94,15.01 42.75,15.05 "
                        ></polygon>
                      </g>
                    </g>
                    <g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="35.77,26.29 24.23,26.29 24.23,24.51 34.9,24.51 36.43,22.54 42.73,22.54 42.73,24.32 37.3,24.32 "
                        ></polygon>
                      </g>
                      <g>
                        <rect
                          x="26.86"
                          y="19.81"
                          class="arma-item-fill"
                          width="2.67"
                          height="1.78"
                        ></rect>
                      </g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="38.4,21.58 31.82,21.58 31.82,19.81 37.53,19.81 39.06,17.85 42.72,17.8 42.75,19.57 39.94,19.61 "
                        ></polygon>
                      </g>
                    </g>
                    <g>
                      <rect
                        x="18.68"
                        y="29.18"
                        class="arma-item-fill"
                        width="4.35"
                        height="1.78"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="33.81"
                        y="29.56"
                        class="arma-item-fill"
                        width="2.29"
                        height="1.78"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="19.33"
                        y="3.36"
                        class="arma-item-fill"
                        width="16.65"
                        height="1.78"
                      ></rect>
                    </g>
                    <g>
                      <polygon
                        class="arma-item-fill"
                        points="43.28,26.1 42.19,24.7 44.22,23.12 44.22,11.5 42.19,9.92 43.28,8.52 46,10.63 46,23.99 "
                      ></polygon>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M4.42,34.54H1.3V0H4.1l2.05,1.65v31.43L4.42,34.54z M3.08,32.77h0.69l0.61-0.51V2.5l-0.9-0.72h-0.4V32.77z"
                      ></path>
                    </g>
                    <g>
                      <polygon
                        class="arma-item-fill"
                        points="2.19,32.18 0,32.18 0,26.34 1.94,25.78 2.44,27.48 1.78,27.68 1.78,30.4 2.19,30.4 "
                      ></polygon>
                    </g>
                    <g>
                      <rect
                        y="18.47"
                        class="arma-item-fill"
                        width="1.78"
                        height="3.57"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        y="13.27"
                        class="arma-item-fill"
                        width="1.78"
                        height="3.57"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        y="8.07"
                        class="arma-item-fill"
                        width="1.78"
                        height="3.57"
                      ></rect>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[6] && byo[6].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[6].name}
                  data-for="divTooltip6"
                >
                  <img src={byo[6].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip6"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-14 m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 32.58 42"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <defs></defs>
                  <g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M29.07,42H1.22C0.55,42,0,41.45,0,40.78V3.5c0-0.67,0.55-1.22,1.22-1.22h27.84c0.67,0,1.22,0.55,1.22,1.22v37.27C30.29,41.45,29.74,42,29.07,42z M1.63,40.37h27.03V3.91H1.63V40.37z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M29.92,41.66l-1.09-1.21l2.07-1.87c0.02-0.02,0.04-0.07,0.04-0.1V1.63H3.53C3.5,1.64,3.45,1.66,3.43,1.68L1.55,3.75l-1.21-1.1l1.89-2.09C2.53,0.23,3.06,0,3.52,0h27.84c0.67,0,1.22,0.55,1.22,1.22V38.5c0,0.45-0.24,0.98-0.57,1.29L29.92,41.66z"
                      ></path>
                    </g>
                    <g>
                      <g>
                        <polygon
                          class="arma-item-fill"
                          points="4.54,11.58 2.91,11.58 2.91,9.69 7.36,4.84 11.42,4.84 11.42,6.47 8.07,6.47 4.54,10.33 "
                        ></polygon>
                      </g>
                      <g>
                        <rect
                          x="2.88"
                          y="5.24"
                          class="arma-item-fill"
                          width="1.7"
                          height="1.63"
                        ></rect>
                      </g>
                    </g>
                    <g>
                      <rect
                        x="25.9"
                        y="5.24"
                        class="arma-item-fill"
                        width="1.7"
                        height="1.63"
                      ></rect>
                    </g>
                    <g>
                      <polygon
                        class="arma-item-fill"
                        points="27.57,11.58 25.94,11.58 25.94,10.36 22.38,6.47 20.84,6.47 20.84,4.84 23.1,4.84 27.57,9.73 "
                      ></polygon>
                    </g>
                    <g>
                      <rect
                        x="2.88"
                        y="32.68"
                        class="arma-item-fill"
                        width="1.7"
                        height="1.63"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="2.88"
                        y="37.62"
                        class="arma-item-fill"
                        width="1.7"
                        height="1.63"
                      ></rect>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M4.86,22.21c0,0.65,0.52,0.94,2.51,0.94c1.65,0,2.15-0.18,2.15-0.66c0-0.51-0.35-0.59-2.33-0.69c-2.66-0.12-3.72-0.54-3.72-1.91c0-1.34,1.37-1.77,3.66-1.77c2.3,0,3.7,0.58,3.7,2.08H9.26c0-0.67-0.67-0.84-2.3-0.84c-1.54,0-1.91,0.15-1.91,0.6c0,0.47,0.37,0.56,2.15,0.66c2.41,0.13,3.9,0.26,3.9,1.81c0,1.63-1.54,1.96-3.8,1.96c-2.5,0-4-0.43-4-2.19H4.86z"
                      ></path>
                      <path
                        class="arma-item-fill"
                        d="M13.09,22.21c0,0.65,0.52,0.94,2.51,0.94c1.65,0,2.15-0.18,2.15-0.66c0-0.51-0.35-0.59-2.33-0.69c-2.66-0.12-3.72-0.54-3.72-1.91c0-1.34,1.37-1.77,3.66-1.77c2.3,0,3.7,0.58,3.7,2.08h-1.57c0-0.67-0.67-0.84-2.3-0.84c-1.54,0-1.91,0.15-1.91,0.6c0,0.47,0.37,0.56,2.15,0.66c2.41,0.13,3.9,0.26,3.9,1.81c0,1.63-1.54,1.96-3.8,1.96c-2.5,0-4-0.43-4-2.19H13.09z"
                      ></path>
                      <path
                        class="arma-item-fill"
                        d="M27.29,21.26c0,2.08-1.39,3.05-2.97,3.05h-4.43v-6.11h4.43C25.9,18.21,27.29,19.19,27.29,21.26z M25.72,21.26c0-1.48-0.8-1.74-1.99-1.74h-2.27V23h2.27C24.92,23,25.72,22.74,25.72,21.26z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[7] && byo[7].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[7].name}
                  data-for="divTooltip7"
                >
                  <img src={byo[7].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip7"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-20 m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 46 31.99"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <defs></defs>
                  <g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M44.86,31.99H1.14C0.51,31.99,0,31.47,0,30.84V10.74C0,10.11,0.51,9.6,1.14,9.6h43.72c0.63,0,1.14,0.51,1.14,1.14v20.11C46,31.47,45.49,31.99,44.86,31.99z M1.83,30.16h42.34V11.42H1.83V30.16z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M11.78,29.17c-4.62,0-8.38-3.76-8.38-8.38c0-4.62,3.76-8.38,8.38-8.38c4.62,0,8.38,3.76,8.38,8.38C20.16,25.41,16.4,29.17,11.78,29.17z M11.78,14.24c-3.61,0-6.55,2.94-6.55,6.55c0,3.61,2.94,6.55,6.55,6.55c3.61,0,6.55-2.94,6.55-6.55C18.33,17.18,15.39,14.24,11.78,14.24z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M11.78,23.99c-1.76,0-3.2-1.43-3.2-3.2c0-1.76,1.43-3.2,3.2-3.2s3.2,1.43,3.2,3.2C14.98,22.55,13.54,23.99,11.78,23.99z M11.78,19.42c-0.76,0-1.37,0.61-1.37,1.37c0,0.76,0.61,1.37,1.37,1.37s1.37-0.61,1.37-1.37C13.15,20.03,12.54,19.42,11.78,19.42z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="9.76"
                        y="15.74"
                        transform="matrix(0.7603 -0.6495 0.6495 0.7603 -7.6662 12.531)"
                        class="arma-item-fill"
                        width="6.77"
                        height="1.83"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="15.16"
                        y="16.65"
                        transform="matrix(0.3626 -0.9319 0.9319 0.3626 -8.4302 27.7499)"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.77"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="13.56"
                        y="20.83"
                        transform="matrix(0.9926 -0.1215 0.1215 0.9926 -2.8344 1.9377)"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.77"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="6.65"
                        y="23.87"
                        transform="matrix(0.817 -0.5766 0.5766 0.817 -12.4541 10.3242)"
                        class="arma-item-fill"
                        width="6.77"
                        height="1.83"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="6.53"
                        y="17.76"
                        transform="matrix(0.4469 -0.8946 0.8946 0.4469 -14.801 18.349)"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.77"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="8.5"
                        y="13.75"
                        transform="matrix(0.9996 -0.0295 0.0295 0.9996 -0.5012 0.2851)"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.77"
                      ></rect>
                    </g>
                    <g>
                      <polygon
                        class="arma-item-fill"
                        points="2.83,10.96 1.24,10.06 6.9,0 39.1,0 44.76,10.06 43.17,10.96 38.03,1.83 7.97,1.83 "
                      ></polygon>
                    </g>
                    <g>
                      <rect
                        x="9.03"
                        y="2.74"
                        class="arma-item-fill"
                        width="1.83"
                        height="1.83"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="35.3"
                        y="2.74"
                        class="arma-item-fill"
                        width="1.83"
                        height="1.83"
                      ></rect>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M38.43,19.77h-5.25l-2.29-2.25v-4.66h9.82v4.66L38.43,19.77z M33.93,17.94h3.75l1.21-1.19v-2.07h-6.17v2.07L33.93,17.94z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="39.58"
                        y="21.86"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.4"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="36.72"
                        y="21.86"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.4"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="33.87"
                        y="21.86"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.4"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="31.01"
                        y="21.86"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.4"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="28.15"
                        y="21.86"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.4"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="25.3"
                        y="21.86"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.4"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="22.44"
                        y="21.86"
                        class="arma-item-fill"
                        width="1.83"
                        height="6.4"
                      ></rect>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M29.22,17.17h-7.13v-4.34h7.13V17.17z M23.91,15.35h3.48v-0.69h-3.48V15.35z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[8] && byo[8].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[8].name}
                  data-for="divTooltip8"
                >
                  <img src={byo[8].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip8"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-12 m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 28 39.93"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <defs></defs>
                  <g>
                    <g>
                      <rect
                        x="4.39"
                        class="arma-item-fill"
                        width="19.17"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="4.39"
                        y="36.29"
                        class="arma-item-fill"
                        width="19.17"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <polygon
                        class="arma-item-fill"
                        points="20.41,37.03 18.93,37.03 18.93,26.24 17.86,24.09 10.1,24.09 9.03,26.24 9.03,37.03 7.55,37.03 7.55,25.89 9.18,22.61 18.77,22.61 20.41,25.89 "
                      ></polygon>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M13.98,32.07c-1.32,0-2.4-1.08-2.4-2.4c0-1.32,1.08-2.4,2.4-2.4s2.4,1.08,2.4,2.4C16.38,30.99,15.3,32.07,13.98,32.07z M13.98,28.74c-0.51,0-0.92,0.41-0.92,0.92c0,0.51,0.41,0.92,0.92,0.92c0.51,0,0.92-0.41,0.92-0.92C14.9,29.16,14.49,28.74,13.98,28.74z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="8.29"
                        y="25.32"
                        class="arma-item-fill"
                        width="9.24"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="8.29"
                        y="29.02"
                        class="arma-item-fill"
                        width="4.25"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="8.29"
                        y="32.72"
                        class="arma-item-fill"
                        width="9.61"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="15.42"
                        y="29.02"
                        class="arma-item-fill"
                        width="2.48"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="4.39"
                        y="4.99"
                        class="arma-item-fill"
                        width="16.66"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="4.39"
                        y="9.89"
                        class="arma-item-fill"
                        width="16.66"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="4.39"
                        y="14.79"
                        class="arma-item-fill"
                        width="16.66"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="6.75"
                        y="2.41"
                        class="arma-item-fill"
                        width="1.76"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M26.34,37.76h-3.51V0h2.43l1.08,1.08V37.76z M24.3,36.29h0.55V1.69l-0.21-0.21H24.3V36.29z"
                      ></path>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M5.13,37.76H1.62V1.08L2.7,0h2.43V37.76z M3.1,36.29h0.55V1.48H3.31L3.1,1.69V36.29z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="6.75"
                        y="17.29"
                        class="arma-item-fill"
                        width="2.49"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="10.65"
                        y="17.29"
                        class="arma-item-fill"
                        width="1.48"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="13.61"
                        y="17.29"
                        class="arma-item-fill"
                        width="1.48"
                        height="1.48"
                      ></rect>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M27.26,39.93H0l0-3.64l0.74,0H28l0,3.64L27.26,39.93z M1.48,38.45h25.04v-0.68H1.48V38.45z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[9] && byo[9].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[9].name}
                  data-for="divTooltip9"
                >
                  <img src={byo[9].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip9"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-16 m-auto flex">
                <svg
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 511.999 511.999"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <g>
                    <g>
                      <g>
                        <path
                          d="M495.411,12.029c-6.978-6.111-15.484-10.076-24.608-11.471c-0.131-0.019-0.262-0.036-0.411-0.053
                    C468.072,0.169,465.729,0,463.428,0H48.572C21.789,0,0.001,21.789,0.001,48.571v414.856c0,14.548,6.442,28.208,17.666,37.471
                    c0.366,0.303,0.742,0.594,1.119,0.885l0.227,0.178c0.156,0.124,0.312,0.248,0.493,0.384c8.446,6.316,18.497,9.654,29.067,9.654
                    h93.51c4.433,0,8.025-3.593,8.025-8.025c0-4.432-3.592-8.025-8.025-8.025h-93.51c-7.078,0-13.805-2.233-19.423-6.436l-0.573-0.45
                    c-0.229-0.177-0.458-0.35-0.687-0.539c-7.524-6.208-11.839-15.356-11.839-25.097V48.571c0-17.933,14.59-32.522,32.523-32.522
                    h414.855c1.552,0,3.141,0.117,4.704,0.343c0.111,0.016,0.224,0.031,0.349,0.045c6.051,0.943,11.703,3.591,16.355,7.664
                    c7.064,6.187,11.115,15.105,11.115,24.468v414.856c0,4.393-0.859,8.652-2.553,12.657c-5.105,12.068-16.869,19.866-29.97,19.866
                    l-296.734-0.001c-4.433,0-8.025,3.593-8.025,8.025c0,4.432,3.592,8.025,8.025,8.025l296.734,0.001
                    c19.563,0,37.129-11.643,44.751-29.664c2.536-5.993,3.821-12.355,3.821-18.909V48.571
                    C512.001,34.583,505.953,21.263,495.411,12.029z"
                        />
                        <path
                          d="M446.52,31.387c-18.192,0-32.992,14.8-32.992,32.99c0,18.192,14.8,32.992,32.992,32.992
                    c18.192,0,32.992-14.8,32.992-32.992C479.512,46.187,464.712,31.387,446.52,31.387z M446.52,81.319
                    c-9.341,0-16.942-7.6-16.942-16.942c0-9.341,7.601-16.941,16.942-16.941c9.341,0,16.942,7.6,16.942,16.941
                    C463.462,73.719,455.862,81.319,446.52,81.319z"
                        />
                        <path
                          d="M413.529,447.314c0,18.192,14.8,32.992,32.992,32.992c18.192,0,32.992-14.8,32.992-32.992
                    c0-18.192-14.8-32.992-32.992-32.992C428.328,414.322,413.529,429.122,413.529,447.314z M463.462,447.313
                    c0,9.342-7.6,16.942-16.942,16.942c-9.341,0-16.942-7.6-16.942-16.942s7.601-16.942,16.942-16.942
                    C455.861,430.371,463.462,437.971,463.462,447.313z"
                        />
                        <path
                          d="M67.023,97.369c18.192,0,32.992-14.8,32.992-32.992c0-18.191-14.8-32.99-32.992-32.99s-32.992,14.8-32.992,32.99
                    C34.031,82.569,48.831,97.369,67.023,97.369z M67.023,47.436c9.341,0,16.942,7.6,16.942,16.941
                    c0,9.342-7.601,16.942-16.942,16.942s-16.942-7.6-16.942-16.942C50.081,55.036,57.681,47.436,67.023,47.436z"
                        />
                        <path
                          d="M67.023,480.304c18.192,0,32.992-14.8,32.992-32.992s-14.8-32.992-32.992-32.992s-32.992,14.8-32.992,32.992
                    S48.831,480.304,67.023,480.304z M67.023,430.372c9.341,0,16.942,7.6,16.942,16.942s-7.601,16.942-16.942,16.942
                    s-16.942-7.6-16.942-16.942S57.681,430.372,67.023,430.372z"
                        />
                        <path
                          d="M257.88,454.141c110.293,0,200.022-89.729,200.022-200.021c0-31.907-7.326-62.426-21.774-90.706
                    c-2.017-3.948-6.85-5.51-10.797-3.496c-3.946,2.016-5.511,6.85-3.496,10.797c13.282,25.998,20.016,54.06,20.016,83.405
                    c0,101.442-82.53,183.971-183.973,183.971S73.907,355.561,73.907,254.119S156.437,70.148,257.88,70.148
                    c61.123,0,118.138,30.353,152.515,81.194c2.482,3.671,7.469,4.635,11.143,2.153c3.672-2.482,4.635-7.471,2.153-11.143
                    C386.326,87.09,324.34,54.098,257.88,54.098c-110.293,0-200.022,89.729-200.022,200.021S147.588,454.141,257.88,454.141z"
                        />
                        <path
                          d="M375.416,134.31c-0.131-0.127-0.263-0.251-0.394-0.379c-0.686-0.669-1.376-1.334-2.073-1.991
                    c-0.122-0.115-0.245-0.228-0.367-0.342c-23.559-22.068-53.459-37.437-86.64-43.043c-0.186-0.032-0.373-0.062-0.56-0.093
                    c-0.963-0.159-1.928-0.315-2.896-0.457c-0.398-0.059-0.798-0.111-1.197-0.168c-0.824-0.116-1.647-0.233-2.474-0.336
                    c-0.862-0.108-1.727-0.202-2.591-0.297c-6.026-0.658-12.144-1.006-18.344-1.006c-48.797,0-92.794,20.929-123.503,54.273
                    c-0.018,0.02-0.036,0.04-0.056,0.06c-0.654,0.71-1.299,1.428-1.94,2.15c-0.223,0.249-0.445,0.499-0.666,0.75
                    c-0.536,0.611-1.068,1.225-1.595,1.844c-0.32,0.375-0.638,0.751-0.954,1.128c-0.459,0.548-0.916,1.097-1.368,1.65
                    c-0.379,0.463-0.753,0.932-1.128,1.4c-0.399,0.5-0.8,0.998-1.194,1.503c-0.421,0.538-0.834,1.083-1.248,1.626
                    c-0.35,0.46-0.704,0.917-1.05,1.38c-0.032,0.043-0.065,0.085-0.096,0.127c-0.011,0.015-0.019,0.031-0.03,0.046
                    c-12.983,17.461-22.655,37.521-28.089,59.242c-0.094,0.377-0.185,0.753-0.276,1.13c-0.359,1.48-0.7,2.967-1.02,4.462
                    c-0.055,0.254-0.113,0.507-0.166,0.761c-0.366,1.749-0.704,3.507-1.014,5.276c-0.043,0.244-0.08,0.489-0.122,0.733
                    c-0.258,1.508-0.494,3.022-0.711,4.543c-0.057,0.399-0.113,0.798-0.168,1.197c-0.226,1.668-0.433,3.343-0.609,5.026
                    c-0.007,0.077-0.018,0.153-0.026,0.23c-0.182,1.76-0.332,3.53-0.458,5.306c-0.03,0.426-0.054,0.853-0.081,1.279
                    c-0.087,1.359-0.157,2.722-0.212,4.089c-0.019,0.486-0.041,0.97-0.056,1.456c-0.055,1.747-0.09,3.499-0.09,5.258
                    c0,1.431,0.019,2.858,0.055,4.283c0.006,0.277,0.023,0.552,0.031,0.829c0.034,1.157,0.074,2.313,0.133,3.467
                    c0.011,0.199,0.026,0.396,0.036,0.595c0.066,1.234,0.142,2.466,0.234,3.696c0.007,0.097,0.018,0.194,0.025,0.29
                    c0.103,1.33,0.22,2.657,0.355,3.98c0.001,0.009,0.002,0.017,0.003,0.026c0.709,6.974,1.854,13.87,3.427,20.669
                    c0.019,0.085,0.042,0.169,0.061,0.254c0.29,1.242,0.591,2.481,0.909,3.717c0.06,0.234,0.125,0.465,0.186,0.699
                    c0.281,1.074,0.569,2.147,0.872,3.216c0.122,0.429,0.253,0.855,0.378,1.284c0.253,0.863,0.504,1.727,0.771,2.587
                    c0.202,0.654,0.417,1.302,0.628,1.953c0.203,0.628,0.401,1.258,0.613,1.885c0.299,0.886,0.611,1.764,0.922,2.644
                    c0.139,0.392,0.273,0.784,0.414,1.175c0.4,1.1,0.815,2.192,1.238,3.282c0.068,0.175,0.133,0.352,0.201,0.527
                    c0.487,1.242,0.989,2.478,1.504,3.706c0.014,0.033,0.027,0.067,0.041,0.101c0,0.001,0.001,0.002,0.002,0.004
                    c7.983,18.989,19.355,36.214,33.362,50.909c0.014,0.015,0.026,0.031,0.04,0.046c0.904,0.948,1.82,1.881,2.745,2.807
                    c0.129,0.129,0.261,0.255,0.391,0.384c0.764,0.76,1.533,1.513,2.311,2.257c0.333,0.319,0.671,0.632,1.007,0.948
                    c0.566,0.532,1.132,1.064,1.706,1.588c0.468,0.428,0.939,0.851,1.411,1.273c0.43,0.384,0.859,0.768,1.292,1.148
                    c0.592,0.52,1.189,1.034,1.788,1.545c0.286,0.243,0.571,0.485,0.858,0.725c0.737,0.621,1.48,1.236,2.228,1.844
                    c0.089,0.073,0.179,0.144,0.267,0.216c19.995,16.184,43.762,27.875,69.76,33.529c0.071,0.015,0.141,0.031,0.212,0.046
                    c1.023,0.22,2.048,0.433,3.076,0.636c0.3,0.059,0.599,0.116,0.898,0.172c0.884,0.168,1.768,0.335,2.656,0.489
                    c0.482,0.085,0.965,0.161,1.449,0.241c0.754,0.124,1.508,0.253,2.266,0.367c0.953,0.144,1.909,0.275,2.865,0.402
                    c7.297,0.973,14.737,1.483,22.295,1.483c17.982,0,35.309-2.853,51.563-8.109c0.095-0.031,0.191-0.062,0.287-0.093
                    c5.22-1.699,10.328-3.646,15.312-5.829c0.063-0.028,0.125-0.055,0.188-0.082c5.035-2.214,9.942-4.666,14.706-7.345
                    c0.043-0.024,0.087-0.046,0.13-0.07c0.04-0.022,0.079-0.045,0.118-0.068c0.003-0.002,0.005-0.003,0.009-0.005
                    c51.059-28.837,85.612-83.614,85.612-146.318c0.001-46.847-19.286-89.263-50.326-119.751
                    C375.455,134.352,375.438,134.33,375.416,134.31z M278.909,198.315c0.344-0.66,0.693-1.317,1.025-1.985
                    c0.039-0.078,0.064-0.16,0.101-0.239c8.214-16.647,12.595-35.082,12.595-53.916c0-12.754-1.938-25.196-5.772-37.144
                    c27.898,5.453,54.029,18.81,74.934,38.442c-0.422,34.945-17.834,67.078-46.868,86.569c-1.521,0.065-3.049,0.097-4.561,0.097
                    h-0.002c-1.193,0-2.385-0.028-3.578-0.068c-0.175-0.006-0.351-0.005-0.528-0.013c-0.889-0.034-1.775-0.096-2.662-0.153
                    c-0.666-0.043-1.33-0.085-1.995-0.14c-0.739-0.061-1.478-0.135-2.215-0.212c-0.856-0.09-1.712-0.19-2.565-0.301
                    c-0.606-0.078-1.212-0.155-1.816-0.244c-0.254-0.037-0.506-0.086-0.76-0.125c-0.034-0.051-0.071-0.101-0.105-0.152
                    c-0.165-0.246-0.335-0.488-0.504-0.731c-0.226-0.324-0.453-0.646-0.686-0.964c-0.179-0.243-0.359-0.483-0.542-0.721
                    c-0.233-0.304-0.469-0.605-0.709-0.902c-0.196-0.244-0.393-0.486-0.594-0.725c-0.229-0.272-0.462-0.538-0.698-0.805
                    c-0.225-0.256-0.447-0.513-0.678-0.763c-0.172-0.187-0.35-0.367-0.525-0.551c-4.907-5.16-10.994-9.185-17.832-11.626
                    c0.168-0.246,0.324-0.5,0.49-0.747c0.433-0.641,0.857-1.289,1.278-1.941c0.347-0.537,0.697-1.072,1.035-1.615
                    c0.461-0.74,0.908-1.49,1.354-2.24c0.267-0.451,0.545-0.895,0.806-1.348c0.677-1.174,1.333-2.361,1.972-3.559
                    C278.509,199.104,278.705,198.708,278.909,198.315z M281.333,269.753c-0.011,0.016-0.021,0.032-0.032,0.049
                    c-0.292,0.472-0.601,0.93-0.916,1.381c-0.109,0.156-0.219,0.312-0.332,0.466c-0.215,0.296-0.439,0.583-0.663,0.87
                    c-0.432,0.549-0.877,1.087-1.347,1.604c-0.003,0.003-0.005,0.006-0.009,0.01c-0.306,0.337-0.621,0.666-0.943,0.989
                    c-0.027,0.027-0.053,0.055-0.081,0.081c-2.319,2.311-5.017,4.242-7.991,5.693c-0.054,0.027-0.107,0.055-0.163,0.081
                    c-0.336,0.162-0.677,0.312-1.02,0.462c-0.211,0.091-0.422,0.18-0.634,0.265c-0.274,0.111-0.548,0.223-0.826,0.326
                    c-0.513,0.189-1.027,0.371-1.55,0.533c-0.033,0.011-0.067,0.018-0.101,0.029c-0.556,0.169-1.119,0.322-1.686,0.459
                    c-0.081,0.02-0.164,0.037-0.246,0.057c-0.576,0.134-1.156,0.254-1.742,0.353c-0.012,0.002-0.024,0.004-0.036,0.006
                    c-1.923,0.324-3.897,0.464-5.9,0.406c-9.252-0.27-17.833-4.888-23.215-12.29c-0.011-0.015-0.021-0.03-0.032-0.045
                    c-0.369-0.51-0.724-1.035-1.063-1.571c-0.011-0.016-0.021-0.032-0.031-0.048c-0.338-0.538-0.659-1.089-0.964-1.651
                    c-0.081-0.152-0.153-0.31-0.244-0.456c-0.005-0.011-0.011-0.02-0.016-0.031c-4.773-9.229-4.359-20.405,1.115-29.298
                    c0.01-0.015,0.019-0.03,0.029-0.045c0.292-0.472,0.601-0.93,0.916-1.381c0.112-0.161,0.226-0.321,0.341-0.479
                    c0.202-0.279,0.414-0.55,0.625-0.821c3.872-4.929,9.261-8.608,15.46-10.331c0.231-0.063,0.461-0.131,0.694-0.188
                    c0.258-0.065,0.519-0.122,0.779-0.18c0.368-0.081,0.736-0.157,1.107-0.225c0.178-0.032,0.355-0.066,0.534-0.095
                    c1.869-0.303,3.784-0.435,5.729-0.377c0.001,0,0.003,0,0.004,0c9.252,0.269,17.834,4.888,23.215,12.291
                    c0.011,0.014,0.02,0.029,0.031,0.043c0.37,0.511,0.725,1.036,1.065,1.573c0.01,0.016,0.02,0.031,0.03,0.046
                    c0.346,0.55,0.674,1.112,0.984,1.687c0.001,0.001,0.001,0.003,0.002,0.004C287.233,249.32,286.896,260.716,281.333,269.753z
                     M257.88,102.247c3.715,0,7.397,0.14,11.046,0.404c5.075,12.559,7.652,25.832,7.652,39.527c0,6.194-0.551,12.337-1.615,18.367
                    c-7.167-22.192-20.56-41.887-38.781-56.742C243.272,102.785,250.514,102.247,257.88,102.247z M215.072,108.401
                    c28.889,18.01,47.221,48.55,49.539,82.629c-0.052,0.099-0.101,0.202-0.153,0.303c-0.718,1.365-1.463,2.713-2.237,4.043
                    c-0.047,0.08-0.089,0.164-0.137,0.244c-0.867,1.48-1.769,2.938-2.704,4.372c-0.042,0.063-0.087,0.124-0.127,0.186
                    c-0.859,1.311-1.748,2.601-2.663,3.87c-0.297,0.413-0.613,0.814-0.917,1.223c-0.673,0.906-1.351,1.807-2.052,2.69
                    c-0.111,0.139-0.228,0.275-0.34,0.414c-1.196,0.071-2.379,0.192-3.549,0.352c-0.078,0.011-0.156,0.019-0.233,0.03
                    c-0.44,0.063-0.877,0.136-1.313,0.211c-0.292,0.05-0.584,0.102-0.875,0.157c-0.324,0.063-0.648,0.127-0.97,0.197
                    c-0.488,0.104-0.973,0.217-1.455,0.337c-0.146,0.036-0.293,0.07-0.438,0.107c-6.718,1.731-12.916,4.951-18.162,9.435
                    c-0.133-0.275-0.277-0.544-0.412-0.818c-0.333-0.679-0.675-1.355-1.021-2.028c-0.299-0.582-0.593-1.165-0.901-1.741
                    c-0.406-0.761-0.828-1.514-1.25-2.266c-0.285-0.506-0.561-1.016-0.852-1.518c-0.653-1.127-1.326-2.244-2.015-3.35
                    c-0.24-0.384-0.489-0.761-0.732-1.142c-0.392-0.614-0.777-1.233-1.18-1.84c-0.049-0.074-0.108-0.138-0.159-0.21
                    c-10.31-15.435-24.084-28.446-40.393-37.861c-10.405-6.008-21.455-10.391-32.988-13.098
                    C163.282,132.1,187.896,116.409,215.072,108.401z M133.212,167.486c12.729,2.03,24.865,6.334,36.132,12.84
                    c5.389,3.112,10.457,6.678,15.166,10.636c-8.395-1.799-16.975-2.724-25.561-2.724c-14.018,0-27.969,2.468-41.151,7.217
                    C121.959,185.556,127.145,176.193,133.212,167.486z M113.143,300.134c-0.043-0.124-0.086-0.25-0.126-0.378
                    c-0.488-1.543-0.948-3.092-1.386-4.648c-0.143-0.509-0.278-1.021-0.415-1.532c-0.318-1.178-0.62-2.36-0.908-3.546
                    c-0.126-0.517-0.259-1.031-0.379-1.55c-0.341-1.467-0.654-2.939-0.95-4.417c-0.13-0.648-0.253-1.3-0.376-1.952
                    c-0.213-1.137-0.412-2.278-0.598-3.422c-0.101-0.615-0.204-1.228-0.297-1.846c-0.214-1.422-0.404-2.849-0.578-4.28
                    c-0.073-0.597-0.14-1.196-0.205-1.795c-0.155-1.419-0.294-2.84-0.41-4.266c-0.025-0.305-0.054-0.609-0.077-0.915
                    c-0.121-1.62-0.21-3.245-0.279-4.874c-0.02-0.464-0.037-0.929-0.053-1.394c-0.058-1.73-0.098-3.464-0.098-5.202
                    c0-1.487,0.027-2.974,0.071-4.456c0.013-0.445,0.034-0.889,0.05-1.333c0.04-1.059,0.089-2.117,0.151-3.175
                    c0.029-0.487,0.06-0.974,0.093-1.461c0.074-1.078,0.159-2.155,0.256-3.23c0.036-0.407,0.07-0.815,0.109-1.221
                    c0.29-2.96,0.664-5.906,1.126-8.837c0.061-0.385,0.127-0.769,0.192-1.153c0.18-1.085,0.369-2.167,0.572-3.247
                    c0.085-0.448,0.17-0.896,0.258-1.342c0.216-1.098,0.446-2.192,0.688-3.284c0.078-0.355,0.152-0.713,0.233-1.068
                    c0.327-1.437,0.674-2.869,1.044-4.295c0.009-0.034,0.019-0.068,0.028-0.103c14.878-7.616,31.426-11.628,48.075-11.628
                    c16.121,0,32.227,3.741,46.719,10.833c0.055,0.087,0.113,0.17,0.168,0.256c0.867,1.372,1.707,2.758,2.508,4.165
                    c0.009,0.015,0.017,0.028,0.026,0.043c0.854,1.499,1.67,3.017,2.448,4.553c0.019,0.037,0.035,0.076,0.055,0.113
                    c0.721,1.427,1.406,2.871,2.062,4.327c0.208,0.461,0.396,0.931,0.597,1.395c0.448,1.037,0.891,2.076,1.305,3.126
                    c0.067,0.17,0.126,0.342,0.193,0.513c-0.003,0.007-0.006,0.014-0.01,0.021c-3.096,6.169-4.851,13.124-4.851,20.485
                    c0,2.826,0.271,5.589,0.763,8.274c-0.444-0.034-0.888-0.048-1.333-0.078c-0.353-0.023-0.707-0.042-1.06-0.062
                    c-4.492-0.257-8.983-0.262-13.456-0.019c-0.365,0.019-0.73,0.029-1.095,0.051c-0.046,0.003-0.09,0.014-0.136,0.017
                    c-18.61,1.202-36.836,6.67-53.111,16.067C130.438,284.316,121.198,291.608,113.143,300.134z M136.049,344.7
                    c-6.388-8.568-11.891-17.832-16.38-27.652c8.106-9.965,17.869-18.296,29.097-24.779c5.364-3.096,10.973-5.694,16.746-7.797
                    C150.283,301.34,140.04,322.167,136.049,344.7z M233.102,309.902c-0.347,0.668-0.701,1.331-1.036,2.005
                    c-0.039,0.078-0.065,0.162-0.102,0.242c-8.213,16.647-12.594,35.081-12.594,53.914c0,12.451,1.85,24.61,5.512,36.31
                    c-0.007-0.002-0.015-0.003-0.022-0.005c-26.224-5.867-50.648-18.742-70.457-37.19c-0.104-0.096-0.209-0.193-0.312-0.29
                    c-1.274-1.194-2.532-2.409-3.767-3.648c1.513-33.547,18.781-64.262,46.751-83.044c1.923-0.082,3.842-0.107,5.759-0.086
                    c0.867,0.011,1.733,0.029,2.601,0.061c0.592,0.021,1.183,0.045,1.775,0.076c1.184,0.064,2.368,0.147,3.55,0.249
                    c0.408,0.035,0.815,0.073,1.223,0.112c1.323,0.131,2.644,0.284,3.961,0.464c0.273,0.037,0.546,0.076,0.82,0.116
                    c0.333,0.048,0.662,0.112,0.995,0.164c0.034,0.052,0.072,0.102,0.106,0.154c0.164,0.245,0.333,0.485,0.501,0.725
                    c0.227,0.326,0.456,0.651,0.69,0.969c0.178,0.241,0.357,0.479,0.539,0.717c0.234,0.306,0.472,0.609,0.714,0.908
                    c0.195,0.242,0.391,0.483,0.591,0.721c0.231,0.274,0.466,0.542,0.703,0.811c0.223,0.254,0.444,0.508,0.672,0.756
                    c0.178,0.193,0.361,0.379,0.541,0.567c4.904,5.154,10.987,9.173,17.818,11.611c-0.168,0.246-0.323,0.499-0.49,0.746
                    c-0.433,0.642-0.857,1.291-1.278,1.943c-0.347,0.536-0.695,1.071-1.034,1.612c-0.465,0.746-0.915,1.501-1.364,2.257
                    c-0.263,0.444-0.536,0.882-0.794,1.329c-0.679,1.177-1.336,2.367-1.977,3.567C233.495,309.13,233.301,309.517,233.102,309.902z
                     M257.879,405.991c-5.037,0.001-10.018-0.251-14.933-0.734c-4.99-12.471-7.526-25.632-7.526-39.196
                    c0-6.191,0.551-12.331,1.614-18.359c7.235,22.412,20.817,42.265,39.309,57.164C270.289,405.604,264.129,405.991,257.879,405.991z
                     M332.129,386.56c-5.362,3.018-10.893,5.703-16.561,8.039c-0.03,0.013-0.057,0.024-0.083,0.034
                    c-1.388,0.571-2.784,1.121-4.188,1.651c-0.027,0.011-0.053,0.02-0.08,0.031c-4.25,1.6-8.57,3.006-12.947,4.215
                    c-0.051,0.014-0.103,0.028-0.155,0.042c-29.577-17.909-48.375-48.798-50.724-83.363c0.052-0.102,0.101-0.205,0.154-0.307
                    c0.717-1.363,1.461-2.71,2.234-4.038c0.047-0.081,0.09-0.165,0.138-0.246c0.867-1.48,1.769-2.937,2.704-4.371
                    c0.043-0.065,0.089-0.128,0.132-0.193c0.858-1.31,1.746-2.598,2.661-3.866c0.296-0.411,0.609-0.81,0.912-1.217
                    c0.675-0.908,1.356-1.813,2.059-2.698c0.11-0.139,0.227-0.273,0.338-0.412c1.202-0.071,2.389-0.193,3.564-0.354
                    c0.072-0.01,0.143-0.017,0.215-0.028c0.445-0.063,0.886-0.137,1.327-0.213c0.287-0.049,0.572-0.099,0.857-0.153
                    c0.331-0.064,0.66-0.13,0.989-0.2c0.478-0.102,0.953-0.213,1.427-0.331c0.154-0.039,0.31-0.074,0.463-0.113
                    c6.716-1.731,12.91-4.951,18.154-9.433c0.135,0.281,0.282,0.554,0.421,0.835c0.323,0.66,0.656,1.316,0.992,1.97
                    c0.308,0.602,0.614,1.206,0.932,1.802c0.38,0.712,0.775,1.416,1.169,2.12c0.357,0.639,0.713,1.279,1.081,1.91
                    c0.6,1.029,1.213,2.052,1.844,3.065c0.256,0.411,0.523,0.814,0.784,1.222c0.379,0.594,0.751,1.192,1.142,1.779
                    c0.047,0.072,0.106,0.134,0.155,0.204c10.31,15.438,24.085,28.451,40.396,37.867c11.051,6.38,22.801,10.926,35.072,13.577
                    C358.991,367.737,346.396,378.192,332.129,386.56z M382.201,341.251c-13.958-1.76-27.248-6.239-39.546-13.338
                    c-5.387-3.11-10.454-6.677-15.162-10.632c8.402,1.801,16.991,2.728,25.584,2.728c0,0,0.001,0,0.003,0
                    c15.621,0,31.111-3.062,45.576-8.922C394.304,321.801,388.766,331.911,382.201,341.251z M400.541,206.301
                    c9.227,26.885,10.724,56.194,4.174,84.114c-15.798,8.865-33.621,13.545-51.635,13.545c-0.001,0-0.005,0-0.005,0
                    c-16.13-0.001-32.244-3.744-46.745-10.841c-0.055-0.086-0.112-0.168-0.167-0.254c-0.867-1.372-1.707-2.76-2.508-4.167
                    c-0.009-0.015-0.018-0.029-0.027-0.044c-0.853-1.499-1.669-3.017-2.447-4.553c-0.02-0.04-0.037-0.079-0.057-0.119
                    c-0.72-1.426-1.405-2.869-2.06-4.324c-0.205-0.458-0.394-0.926-0.593-1.387c-0.449-1.04-0.893-2.082-1.309-3.134
                    c-0.067-0.169-0.126-0.342-0.193-0.513c0.003-0.006,0.005-0.012,0.009-0.018c3.098-6.171,4.852-13.126,4.852-20.488
                    c0-2.826-0.271-5.589-0.762-8.274c0.214,0.016,0.428,0.022,0.642,0.037c1.031,0.073,2.064,0.134,3.098,0.181
                    c0.704,0.032,1.408,0.054,2.112,0.074c0.548,0.015,1.096,0.025,1.643,0.033c2.796,0.042,5.586-0.016,8.372-0.167
                    c0.358-0.019,0.719-0.028,1.076-0.05c0.045-0.003,0.088-0.013,0.133-0.017c18.613-1.201,36.838-6.668,53.114-16.066
                    C382.305,223.494,392.111,215.596,400.541,206.301z M394.677,188.18c-8.528,11.293-19.076,20.651-31.442,27.792
                    c-5.351,3.089-10.947,5.683-16.708,7.783c16.149-17.866,26.652-40.148,30.08-64.226
                    C383.64,168.337,389.72,177.937,394.677,188.18z"
                        />
                        <path
                          d="M255.999,234.146c-11.013,0-19.972,8.96-19.972,19.973c0,11.013,8.959,19.973,19.972,19.973
                    c11.014,0,19.974-8.96,19.974-19.973S267.014,234.146,255.999,234.146z M255.999,258.043c-2.162,0-3.922-1.76-3.922-3.924
                    c0-2.163,1.76-3.924,3.922-3.924c2.164,0,3.925,1.76,3.925,3.924C259.924,256.282,258.163,258.043,255.999,258.043z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[10] && byo[10].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[10].name}
                  data-for="divTooltip10"
                >
                  <img src={byo[10].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip10"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-14 m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 38 40.85"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <defs></defs>
                  <g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M12.51,40.85l-5.92,0c-0.1,0-2.48-0.1-4.32-2.19c-1.65-1.88-2.32-4.7-1.97-8.38c0.67-7.11,0.32-9.45,0.08-10.99c-0.08-0.53-0.15-0.99-0.17-1.52c-0.01-0.24-0.05-0.54-0.08-0.86c-0.17-1.46-0.44-3.66,1.09-5.42c1.46-1.68,4.17-2.53,8.3-2.61l0.02,0l0.02,0c4.13,0.08,6.85,0.93,8.31,2.61c1.54,1.76,1.28,3.97,1.11,5.43c-0.04,0.32-0.07,0.61-0.08,0.85c-0.02,0.53-0.09,0.99-0.17,1.52c-0.24,1.55-0.59,3.89,0.08,10.99c0.35,3.68-0.31,6.5-1.97,8.38c-1.84,2.09-4.22,2.19-4.32,2.19L12.51,40.85z M6.64,39.23h5.84c0.17-0.01,1.84-0.14,3.16-1.66c1.33-1.53,1.85-3.92,1.55-7.12c-0.69-7.31-0.32-9.77-0.07-11.39c0.08-0.5,0.14-0.9,0.15-1.34c0.01-0.3,0.05-0.63,0.09-0.97c0.15-1.31,0.34-2.95-0.72-4.17c-1.13-1.29-3.52-1.99-7.1-2.06c-3.58,0.07-5.96,0.76-7.08,2.05c-1.06,1.21-0.86,2.85-0.71,4.16c0.04,0.35,0.08,0.69,0.09,0.99c0.02,0.44,0.08,0.84,0.15,1.34c0.25,1.63,0.62,4.09-0.07,11.39c-0.3,3.2,0.22,5.59,1.55,7.12C4.8,39.08,6.47,39.22,6.64,39.23z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="8.73"
                        y="9.7"
                        class="arma-item-fill"
                        width="1.63"
                        height="3.13"
                      ></rect>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M9.59,21.94h-0.1c-1.35,0-2.44-1.1-2.44-2.44v-5.04c0-1.35,1.1-2.44,2.44-2.44h0.1c1.35,0,2.44,1.1,2.44,2.44v5.04C12.04,20.85,10.94,21.94,9.59,21.94z M9.49,13.64c-0.45,0-0.81,0.37-0.81,0.81v5.04c0,0.45,0.37,0.81,0.81,0.81h0.1c0.45,0,0.81-0.37,0.81-0.81v-5.04c0-0.45-0.37-0.81-0.81-0.81H9.49z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="6.71"
                        y="22.89"
                        transform="matrix(2.687490e-03 -1 1 2.687490e-03 -14.1853 33.1913)"
                        class="arma-item-fill"
                        width="5.67"
                        height="1.63"
                      ></rect>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M11.67,10.15l-0.72-2.48H8.13l-0.72,2.48L5.85,9.69l0.78-2.67c0.16-0.57,0.71-0.98,1.3-0.98h3.22c0.59,0,1.14,0.41,1.3,0.98l0.78,2.67L11.67,10.15z"
                      ></path>
                    </g>
                    <g>
                      <rect
                        x="5.38"
                        y="35.09"
                        class="arma-item-fill"
                        width="1.63"
                        height="1.63"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="8.73"
                        y="35.09"
                        class="arma-item-fill"
                        width="1.63"
                        height="1.63"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="12.07"
                        y="35.09"
                        class="arma-item-fill"
                        width="1.63"
                        height="1.63"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="33.32"
                        y="18.72"
                        class="arma-item-fill"
                        width="1.63"
                        height="3.41"
                      ></rect>
                    </g>
                    <g>
                      <path
                        class="arma-item-fill"
                        d="M31.08,31.16h-2.65c-2.13,0-3.87-1.74-3.87-3.87V3.87c0-1.24-1-2.24-2.24-2.24h-9.73c-1.24,0-2.24,0.99-2.24,2.21v3.02H8.73V3.84C8.73,1.72,10.46,0,12.59,0h9.73c2.13,0,3.87,1.74,3.87,3.87v23.42c0,1.24,1,2.24,2.24,2.24h2.65c1.24,0,2.24-1,2.24-2.24v-2.1h1.63v2.1C34.95,29.42,33.21,31.16,31.08,31.16z"
                      ></path>
                    </g>
                    <g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M35.35,19.24h-2.44c-1.46,0-2.65-1.19-2.65-2.65V11.7H38v4.89C38,18.05,36.81,19.24,35.35,19.24z M31.89,13.33v3.26c0,0.56,0.46,1.02,1.02,1.02h2.44c0.56,0,1.02-0.46,1.02-1.02v-3.26H31.89z"
                        ></path>
                      </g>
                      <g>
                        <rect
                          x="31.08"
                          y="14.65"
                          class="arma-item-fill"
                          width="3.05"
                          height="1.63"
                        ></rect>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M37.12,12.52h-1.63V8.05h-2.44v4.46h-1.63V7.44c0-0.56,0.48-1.02,1.06-1.02h3.57c0.59,0,1.06,0.46,1.06,1.02V12.52z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="border-2 w-32 h-32 flex">
            {byo[11] && byo[11].image ? (
              <>
                <div
                  className=" m-auto flex"
                  data-tip={byo[11].name}
                  data-for="divTooltip11"
                >
                  <img src={byo[11].image} alt="" />
                </div>
                <ReactTooltip
                  id="divTooltip11"
                  place="top"
                  effect="solid"
                  textColor="#000"
                  className="  !text-base !bg-white !opacity-100"
                  backgroundColor="#ffffff"
                  border
                  borderColor="#303f9f"
                />
              </>
            ) : (
              <div className="w-16 m-auto flex">
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 41.87 38"
                  className="w-28 h-28 m-auto "
                  fill="rgb(56,56,56)"
                >
                  <defs></defs>
                  <g>
                    <g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M40.87,38H1.01C0.45,38,0,37.55,0,36.99V19.22c0-0.55,0.45-1.01,1.01-1.01h39.86c0.55,0,1.01,0.45,1.01,1.01v17.78C41.87,37.55,41.42,38,40.87,38z M1.61,36.39h38.65V19.82H1.61V36.39z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M33.36,35.62H8.34v-4.36h25.02V35.62z M9.95,34.01h21.8v-1.14H9.95V34.01z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M7.06,35.62H2.84v-4.36h4.23V35.62z M4.45,34.01h1.01v-1.14H4.45V34.01z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M7.06,30.29H2.84v-4.36h4.23V30.29z M4.45,28.68h1.01v-1.14H4.45V28.68z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M7.06,24.92H2.84v-4.36h4.23V24.92z M4.45,23.31h1.01v-1.14H4.45V23.31z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M12.56,24.92H8.34v-4.36h4.23V24.92z M9.95,23.31h1.01v-1.14H9.95V23.31z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M18.06,24.92h-4.23v-4.36h4.23V24.92z M15.45,23.31h1.01v-1.14h-1.01V23.31z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M23.56,24.92h-4.23v-4.36h4.23V24.92z M20.95,23.31h1.01v-1.14h-1.01V23.31z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M29.06,24.92h-4.23v-4.36h4.23V24.92z M26.45,23.31h1.01v-1.14h-1.01V23.31z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M34.57,24.92h-4.23v-4.36h4.23V24.92z M31.95,23.31h1.01v-1.14h-1.01V23.31z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M38.79,30.29h-8.45v-4.36h8.45V30.29z M31.95,28.68h5.23v-1.14h-5.23V28.68z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M12.56,30.29H8.34v-4.36h4.23V30.29z M9.95,28.68h1.01v-1.14H9.95V28.68z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M18.06,30.29h-4.23v-4.36h4.23V30.29z M15.45,28.68h1.01v-1.14h-1.01V28.68z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M23.56,30.29h-4.23v-4.36h4.23V30.29z M20.95,28.68h1.01v-1.14h-1.01V28.68z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M29.06,30.29h-4.23v-4.36h4.23V30.29z M26.45,28.68h1.01v-1.14h-1.01V28.68z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M38.79,35.62h-4.23v-4.36h4.23V35.62z M36.18,34.01h1.01v-1.14h-1.01V34.01z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M11.26,19.02H9.65v-1.11H5.76v1.11H4.15v-1.71c0-0.55,0.45-1.01,1.01-1.01h5.1c0.55,0,1.01,0.45,1.01,1.01V19.02z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M8.51,17.1H6.9v-1.54c0-1.29,1.08-2.35,2.41-2.35h23.65c0.44,0,0.8-0.36,0.8-0.8v-0.8c0-0.44-0.36-0.8-0.8-0.8h-11.2c-1.33,0-2.41-1.08-2.41-2.41V6.64h1.61v1.74c0,0.44,0.36,0.8,0.8,0.8h11.2c1.33,0,2.41,1.08,2.41,2.41v0.8c0,1.33-1.08,2.41-2.41,2.41H9.31c-0.44,0-0.8,0.34-0.8,0.74V17.1z"
                        ></path>
                      </g>
                      <g>
                        <path
                          class="arma-item-fill"
                          d="M21.35,7.45h-2.41c-1.44,0-2.62-1.17-2.62-2.62V0h7.65v4.83C23.97,6.27,22.79,7.45,21.35,7.45z M17.93,1.61v3.22c0,0.55,0.45,1.01,1.01,1.01h2.41c0.55,0,1.01-0.45,1.01-1.01V1.61H17.93z"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <rect
                        x="17.12"
                        y="2.92"
                        class="arma-item-fill"
                        width="3.02"
                        height="1.61"
                      ></rect>
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        {categories[i] === 'processors' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your Processor:
          </h2>
        ) : null}
        {categories[i] === 'motherboards' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your Motherboard:
          </h2>
        ) : null}
        {categories[i] === 'cpu_fan' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your CPU Fan:
          </h2>
        ) : null}
        {categories[i] === 'ram' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your RAM:
          </h2>
        ) : null}
        {categories[i] === 'gpus' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your Graphic Card:
          </h2>
        ) : null}
        {categories[i] === 'storage' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your Storage:
          </h2>
        ) : null}
        {categories[i] === 'power_supply' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your Power Supply Unit:
          </h2>
        ) : null}
        {categories[i] === 'cases' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your Case:
          </h2>
        ) : null}
        {categories[i] === 'case_fan' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your Case Fan:
          </h2>
        ) : null}
        {categories[i] === 'mouses' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9">
            Choose your Mouse:
          </h2>
        ) : null}
        {categories[i] === 'keyboards' ? (
          <h2 className="font-medium font-display text-2xl mb-9 ml-60 mt-9 ">
            Choose your Keyboard:
          </h2>
        ) : null}
      </div>
      <div className="flex flex-wrap justify-evenly">
        {!byo[0] ? (
          <div className="w-2/3 mx-auto mb-14">
            <h2 className="font-medium font-display text-2xl mb-4">
              Select your Brand
            </h2>
            <div className="flex mx-auto justify-between">
              <div
                onClick={() => {
                  dispatch(addToBuild('intel'));
                  setI(i + 1);
                }}
                className="cursor-pointer mr-2 shadow-2xl  hover:scale-105 transition duration-300 ease-in-out"
              >
                <img
                  src={require('../../../img/intel.png')}
                  className="rounded"
                />
              </div>
              <div
                onClick={() => {
                  dispatch(addToBuild('amd'));
                  setI(i + 1);
                }}
                className="cursor-pointer ml-2 shadow-2xl  hover:scale-105 transition duration-300 ease-in-out"
              >
                <img
                  src={require('../../../img/amd.webp')}
                  className="rounded"
                />
              </div>
            </div>
          </div>
        ) : null}

        {byo[0]
          ? products
              .filter((e) => {
                if (i === 0) {
                  return (
                    e.categoryName === categories[i] &&
                    e.details[0].socketType[0] === firstLetter
                  );
                }

                if (byo[1].id) {
                  if (i === 1) {
                    return (
                      e.categoryName === categories[i] &&
                      e.details[0].socketType === byo[1].details[0].socketType
                    );
                  }
                }

                return e.categoryName === categories[i];
              })
              .map((component) => (
                <div
                  key={component.id}
                  onClick={() => {
                    dispatch(addToBuild(component.id));
                    setI(i + 1);
                  }}
                  className="w-72 h-96 mb-11 bg-white rounded-xl text-center shadow-xl border  m-2 relative flex flex-col justify-between cursor-pointer"
                >
                  <div className="h-96 flex flex-col p-5">
                    <h2 className="font-semibold tracking-wide text-slate-700 font-display">
                      {component.name.length > 50
                        ? `${component.name.slice(0, 60)}...`
                        : component.name}
                    </h2>
                    <img
                      className="m-auto h-40"
                      src={component.image.replace('SL75', 'SL500')}
                      alt={component.name}
                    />
                    <p className="text-2xl font-display text-slate-700">
                      $ {component.price === 0 ? 50 : component.price}
                    </p>
                  </div>
                </div>
              ))
          : null}
      </div>

      {i === categories.length ? (
        <div className="mt-24">
          <div className="w-24 m-auto mb-9">
            <svg viewBox="0 0 24 24" classname="w-9 mx-auto my-6">
              <path
                fill="green"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          </div>
          <div className="text-center mb-60">
            <h3 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl">
              You're all set!
            </h3>
            <p className="font-medium text-xl mb-4">
              Thanks for using our tool!
            </p>
            <div className="flex flex-row mx-auto justify-center relative">
              <p className="w-2/5">
                You can now proceed and add your custom build to your Cart,
                enjoy!
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BuildYourOwn;
