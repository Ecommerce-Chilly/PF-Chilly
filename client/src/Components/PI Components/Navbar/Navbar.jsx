import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Login from "../../Login/Login/Login";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="Navbar">
        <div className="logoAndName">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3665/3665899.png"
            alt="logo-chilly"
            className="logo"
          />
          <span className="nav-logo">Chilly</span>
        </div>
        <div className="searchProduct">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5367/5367698.png"
            alt="search"
            className="logo"
          />
          <input type="text" placeholder="Search Component..."></input>
        </div>
        <div className={`nav-items ${open && "open"}`}>
          <Link to="/cart">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
              alt="icon-cart"
              className="logo"
            />
          </Link>
          <Link to="/user/favorites">
            <img
              src="https://cdn-icons-png.flaticon.com/512/121/121727.png"
              alt="icon-favorites"
              className="logo"
            />
          </Link>
          <Link to="/user/info">
          <Login />
           
           
           
            
          </Link>
        </div>
      </div>
      <div className="Navbar2">
        <Link to="/home">
          <a href="/home" className="decoration">
            Home
          </a>
        </Link>
        <Link to="/store">
          <a href="/store" className="decoration">
            Store
          </a>
        </Link>
        <Link to="/build+your+own">
          <a href="/build+your+own" className="decoration">
            Build Your Own
          </a>
        </Link>
        <Link to="/special+offers">
          <a href="/special+offers" className="decoration">
            Special Offers
          </a>
        </Link>
        <Link to="/blog">
          <a href="/blog" className="decoration">
            Blog
          </a>
        </Link>
        <Link to="/about+us">
          <a href="/about+us" className="decoration">
            About Us
          </a>
        </Link>
      </div>
      <div className="Navbar2">
        <Link to="/panel+admin/products">
          <a href="/panel+admin/products" className="decoration">
            PANEL ADMIN - Products
          </a>
        </Link>
        <Link to="/panel+admin/create/product">
          <a href="/panel+admin/create/product" className="decoration">
            PANEL ADMIN - Create Product
          </a>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
