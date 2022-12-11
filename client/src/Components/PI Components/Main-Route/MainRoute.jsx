import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Cart from "../../Cart/Cart/Cart";
import Navbar from "../Navbar/Navbar";
import Fav from "../../Extras/Fav/Fav";
import UserInfo from "../../Login/UserInfo/UserInfo";
import CreateComponent from "../../PanelAdmin/CreateComponent/CreateComponent";
import ChangeComponent from "../../PanelAdmin/ChangeComponent/ChangeComponent";
import ProductsDeleted from "../../PanelAdmin/Products/ProductsDeleted";
import Orders from "../../PanelAdmin/Orders/Orders";
import OrderDetail from "../../PanelAdmin/Orders/OrderDetail";
import Products from "../../PanelAdmin/Products/Products";
import ProductDetail from "../../PanelAdmin/Products/ProductDetail";
import ProductStoreDetail from "../../PanelAdmin/Products/ProductStoreDetail";
import Home from "../Pages/Home";
import Store from "../Pages/Store";
import BuildYourOwn from "../Pages/BuildYourOwn";
import SpecialOffers from "../Pages/SpecialOffers";
import Blog from "../Pages/Blog";
import AboutUS from "../Pages/AboutUS";
import Footer from "../Footer/Footer";
import Register from "../../Login/Register/Register";
import PagoExitoso from "../../Cart/Cart/Pagoexitoso.jsx";
import PagoFallido from "../../Cart/Cart/PagoFallido.jsx";
import PagoPendiente from "../../Cart/Cart/PagoPendiente.jsx";
import { userSpecific } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import PanelAdmin from "../../PanelAdmin/PanelAdmin";
import Users from "../../PanelAdmin/Users/Users";
import PageNotFound from "../Pages/PageNotFound";

function MainRoute() {
  let dispatch = useDispatch();

  React.useEffect(() => {
    const user = window.localStorage.getItem("user");

    if (user) {
      dispatch(userSpecific(JSON.parse(user)));
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div>
        <Switch>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/user/favorites" component={Fav} />
          <Route exact path="/user/info" component={UserInfo} />
          <Route exact path="/" component={Home} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/build+your+own" component={BuildYourOwn} />
          <Route exact path="/special+offers" component={SpecialOffers} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/about+us" component={AboutUS} />
          <Route exact path="/panel+admin" component={PanelAdmin} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/panel+admin" component={PanelAdmin} />
          <Route exact path="/panel+admin/products" component={Products} />
          <Route exact path="/panel+admin/users" component={Users} />
          <Route exact path="/panel+admin/orders" component={Orders} />
          <Route exact path="/panel+admin/orders/:id" component={OrderDetail} />
          <Route
            exact
            path="/panel+admin/products/:id"
            component={ProductDetail}
          />
          <Route
            exact
            path="/store/products/:id"
            component={ProductStoreDetail}
          />
          <Route
            exact
            path="/panel+admin/create/product"
            component={CreateComponent}
          />
          <Route
            exact
            path="/panel+admin/change/product/:id"
            component={ChangeComponent}
          />
          <Route
            exact
            path="/panel+admin/deleted"
            component={ProductsDeleted}
          />

          <Route exact path="/paymentsuccess" component={PagoExitoso} />
          <Route exact path="/paymentpending" component={PagoPendiente} />
          <Route exact path="/paymentfailure" component={PagoFallido} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MainRoute;
