import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Cart from '../../Cart/Cart/Cart';
import Navbar from '../Navbar/Navbar';
import Fav from '../../Extras/Fav/Fav';
import UserInfo from '../../Login/UserInfo/UserInfo';
import CreateComponent from '../../PanelAdmin/CreateComponent/CreateComponent';
import ChangeComponent from '../../PanelAdmin/ChangeComponent/ChangeComponent';
import ProductsDeleted from '../../PanelAdmin/Products/ProductsDeleted';
import Products from '../../PanelAdmin/Products/Products';
import ProductDetail from '../../PanelAdmin/Products/ProductDetail';
import ProductStoreDetail from '../../PanelAdmin/Products/ProductStoreDetail';
import Home from '../Pages/Home';
import Store from '../Pages/Store';
import BuildYourOwn from '../Pages/BuildYourOwn';
import SpecialOffers from '../Pages/SpecialOffers';
import Blog from '../Pages/Blog';
import AboutUS from '../Pages/AboutUS';
import Footer from '../Footer/Footer';
import Register from '../../Login/Register/Register';
import {
  userSpecific,
  userAdmin,
  logoutUser,
  createUser,
} from '../../../redux/actions/actions';
import { useDispatch } from 'react-redux';
import Ejemplo from '../../Login/Login/Ejemplo';
import Pagoexitoso from '../../Cart/Cart/Pagoexistoso';
import PanelAdmin from '../../PanelAdmin/PanelAdmin';

function MainRoute() {
  let dispatch = useDispatch();
  const createdAndSearch = async (user, token) => {
    await dispatch(createUser({ email: JSON.parse(user) }, token));
    await dispatch(userSpecific(JSON.parse(user), token));
    await dispatch(userAdmin(JSON.parse(user), token));
  };
  React.useEffect(() => {
    const user = window.localStorage.getItem('email');
    let token = localStorage.getItem('token');
    token = JSON.parse(token);
    if (user) {
      createdAndSearch(user, token);
    }
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Route exact path="/ejemplo">
          <Ejemplo />
        </Route>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/user/favorites" component={Fav} />
        <Route exact path="/user/info" component={UserInfo} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/build+your+own" component={BuildYourOwn} />
        <Route exact path="/special+offers" component={SpecialOffers} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/about+us" component={AboutUS} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/panel+admin" component={PanelAdmin} />
        <Route exact path="/panel+admin/products" component={Products} />
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
        <Route exact path="/panel+admin/deleted" component={ProductsDeleted} />
        <Route
          exact
          path="/pagoexitosisimojodermecagoento"
          component={Pagoexitoso}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MainRoute;
