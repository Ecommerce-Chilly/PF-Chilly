import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from '../../Cart/Cart/Cart';
import Navbar from '../Navbar/Navbar';
import Fav from '../../Extras/Fav/Fav';
import UserInfo from '../../Login/UserInfo/UserInfo';
import CreateComponent from '../../PanelAdmin/CreateComponent/CreateComponent';
import ChangeComponent from '../../PanelAdmin/ChangeComponent/ChangeComponent';
import ProductsDeleted from '../../PanelAdmin/Products/ProductsDeleted';
import Orders from '../../PanelAdmin/Orders/Orders';
import OrderDetailUser from '../../PanelAdmin/Orders/OrderDetailUser';
import OrderDetail from '../../PanelAdmin/Orders/OrderDetail';
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
import PagoExitoso from '../../Cart/Cart/PagoExitoso.jsx';
import PagoFallido from '../../Cart/Cart/PagoFallido.jsx';
import PagoPendiente from '../../Cart/Cart/PagoPendiente.jsx';
import { userSpecific } from '../../../redux/actions/actions';
import { useDispatch } from 'react-redux';
import PanelAdmin from '../../PanelAdmin/PanelAdmin';
import Users from '../../PanelAdmin/Users/Users';
import CheckoutDataUser from '../../Cart/Cart/CheckoutDataUser';
import DataUsers from '../../PanelAdmin/Users/DataUsers';
import PageNotFound from '../Pages/PageNotFound';

function MainRoute() {
  let dispatch = useDispatch();

  React.useEffect(() => {
    const user = window.localStorage.getItem('user');
    const token = JSON.parse(window.localStorage.getItem('token') || 'null');

    if (user && token) {
      dispatch(userSpecific(JSON.parse(user), token));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/user/favorites" element={<Fav />} />
          <Route path="/user/info" element={<UserInfo />} />
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route
            path="/checkout+data+user"
            element={<CheckoutDataUser />}
          />
          <Route path="/data+orders" element={<DataUsers />} />
          <Route path="/build+your+own" element={<BuildYourOwn />} />
          <Route path="/special+offers" element={<SpecialOffers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about+us" element={<AboutUS />} />
          <Route path="/panel+admin" element={<PanelAdmin />} />
          <Route path="/register" element={<Register />} />

          <Route path="/panel+admin/products" element={<Products />} />
          <Route path="/panel+admin/users" element={<Users />} />
          <Route path="/panel+admin/orders" element={<Orders />} />
          <Route path="/panel+admin/orders/:id" element={<OrderDetail />} />
          <Route path="/orders/:id" element={<OrderDetailUser />} />
          <Route
            path="/panel+admin/products/:id"
            element={<ProductDetail />}
          />
          <Route
            path="/store/products/:id"
            element={<ProductStoreDetail />}
          />
          <Route
            path="/panel+admin/create/product"
            element={<CreateComponent />}
          />
          <Route
            path="/panel+admin/change/product/:id"
            element={<ChangeComponent />}
          />
          <Route
            path="/panel+admin/deleted"
            element={<ProductsDeleted />}
          />
          <Route path="/paymentsuccess" element={<PagoExitoso />} />
          <Route path="/paymentpending" element={<PagoPendiente />} />
          <Route path="/paymentfailure" element={<PagoFallido />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MainRoute;
