import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllUsers,
  getProduct,
  getProductDeleted,
} from "../../redux/actions/actions";
import AdminNavbar from "../PI Components/Navbar/AdminNavbar";
import ForbiddenAccess from "./ForbiddenAccess.jsx";

function PanelAdmin() {
  const admin = useSelector((state) => state.admin);
  const products = useSelector((state) => state.allProduct);
  const deleted = useSelector((state) => state.productsDeleted);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  useEffect(() => {
    const dispatchActions = async () => {
      await dispatch(getAllUsers(token));
      dispatch(getProduct());
      dispatch(getProductDeleted(token));
    };
    dispatchActions();
  }, []);

  return (
    <>
      {admin === true ? (
        <div className="min-h-screen flex text-slate-900">
          <AdminNavbar></AdminNavbar>
          <div className=" w-screen min-h-screen px-5 font-display">
            <h2 className="uppercase font-sans font-semibold text-lg mb-9 py-4 ml-9 mt-2">
              Administrator Panel
            </h2>
            <div className="flex flex-row justify-evenly">
              <div className="w-64  bg-white h-72 text-center rounded-xl shadow-xl border">
                <h2></h2>
                <div className="w-1/3 m-auto mt-9">
                  <svg
                    viewBox="0 -5.88 33.187 33.187"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgb(56,56,56)"
                  >
                    <g transform="translate(-97.647 -133.589)">
                      <path d="M123.619,135.589a.6.6,0,0,1,.6.6V147.1a.6.6,0,0,1-.6.6H104.465a.6.6,0,0,1-.6-.6V136.19a.6.6,0,0,1,.6-.6h19.154m0-2H104.465a2.6,2.6,0,0,0-2.6,2.6V147.1a2.6,2.6,0,0,0,2.6,2.6h19.154a2.6,2.6,0,0,0,2.6-2.6V136.19a2.6,2.6,0,0,0-2.6-2.6Z" />
                      <path d="M129.376,155.012H99.106a1.465,1.465,0,0,1-1.037-2.494l4.224-4.282a1,1,0,1,1,1.423,1.4l-3.326,3.372h27.7l-3.3-3.351a1,1,0,1,1,1.424-1.4l4.2,4.26a1.466,1.466,0,0,1-1.036,2.495Z" />
                    </g>
                  </svg>
                </div>
                <p className="text-4xl py-5 font-medium ">{products.length}</p>
                <p className="pb-5">Total Products</p>
                <Link
                  to="/panel+admin/products"
                  href=""
                  className="text-main hover:underline"
                >
                  Manage
                </Link>
              </div>
              <div className="w-64  bg-white h-72 text-center rounded-xl shadow-xl border">
                <h2></h2>
                <div className="w-1/3 m-auto mt-9">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Iconly/Curved/Profile">
                      <g id="Profile">
                        <path
                          id="Stroke 1"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.8445 21.6618C8.15273 21.6618 5 21.0873 5 18.7865C5 16.4858 8.13273 14.3618 11.8445 14.3618C15.5364 14.3618 18.6891 16.4652 18.6891 18.766C18.6891 21.0658 15.5564 21.6618 11.8445 21.6618Z"
                          stroke="rgb(56,56,56)"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          id="Stroke 3"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.8372 11.1735C14.26 11.1735 16.2236 9.2099 16.2236 6.78718C16.2236 4.36445 14.26 2.3999 11.8372 2.3999C9.41452 2.3999 7.44998 4.36445 7.44998 6.78718C7.4418 9.20172 9.3918 11.1654 11.8063 11.1735C11.8172 11.1735 11.8272 11.1735 11.8372 11.1735Z"
                          stroke="rgb(56,56,56)"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <p className="text-4xl py-5 font-medium ">{users.length}</p>
                <p className="pb-5">Total Users</p>
                <Link
                  to="/panel+admin/users"
                  href=""
                  className="text-main hover:underline"
                >
                  Manage
                </Link>
              </div>
              <div className="w-64  bg-white h-72 text-center rounded-xl shadow-xl border">
                <h2></h2>
                <div className="w-1/3 m-auto mt-9">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 4L5.30343 18.0765C5.54671 19.5633 6.60471 20.7872 8.04061 21.2431L8.36905 21.3473C10.7316 22.0973 13.2684 22.0973 15.6309 21.3473L15.9594 21.2431C17.3953 20.7872 18.4533 19.5633 18.6966 18.0765L21 4"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <ellipse
                      cx="12"
                      cy="4"
                      rx="9"
                      ry="2"
                      stroke="rgb(56,56,56)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-4xl py-5 font-medium ">{deleted.length}</p>
                <p className="pb-5">Total Deleted Products</p>
                <Link
                  to="/panel+admin/deleted"
                  href=""
                  className="text-main hover:underline"
                >
                  Manage
                </Link>
              </div>
              <div className="w-64  bg-white h-72 text-center rounded-xl shadow-xl border">
                <h2></h2>
                <div className="w-1/3 m-auto mt-9">
                  <svg
                    viewBox="0 0 32 32"
                    id="i-cart"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="rgb(56,56,56)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                  >
                    <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                    <circle cx="25" cy="27" r="2" />
                    <circle cx="12" cy="27" r="2" />
                  </svg>
                </div>
                <p className="text-4xl py-5 font-medium ">54</p>
                <p className="pb-5">Total Orders</p>
                <Link to="#" href="" className="text-main hover:underline">
                  Manage
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ForbiddenAccess />
        </>
      )}
    </>
  );
}

export default PanelAdmin;
