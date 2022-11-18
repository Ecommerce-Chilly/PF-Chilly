import React from "react";
import { Route } from "react-router-dom";
import Cart from "../../Cart/Cart/Cart";
import Navbar from "../Navbar/Navbar";
import Fav from "../../Extras/Fav/Fav";
import UserInfo from "../../Login/UserInfo/UserInfo";
import CreateComponent from "../../PC Components/CreateComponent/CreateComponent";
import Home from "../Pages/Home";
import Store from "../Pages/Store";
import BuildYourOwn from "../Pages/BuildYourOwn";
import SpecialOffers from "../Pages/SpecialOffers";
import Blog from "../Pages/Blog";
import AboutUS from "../Pages/AboutUS"

function MainRoute() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/user/favorites" component={Fav} />
        <Route exact path="/user/info" component={UserInfo} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/build+your+own" component={BuildYourOwn} />
        <Route exact path="/special+offers" component={SpecialOffers} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/about+us" component={AboutUS} />


        <Route exact path="/create/product" component={CreateComponent} />
      </div>
    </>
  );
}

export default MainRoute;
