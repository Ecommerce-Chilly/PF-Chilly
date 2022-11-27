<<<<<<< HEAD
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/actions/actions.js";
import Filters from "../../PI Components/Filters/Filters";
import Paginate from "../../PI Components/Paginate/Paginate";
=======
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/actions/actions.js';
import Filters from '../../PI Components/Filters/Filters';
import Paginate from '../../PI Components/Paginate/Paginate';
import '../../PI Components/Paginate/Paginate.css';
>>>>>>> 99b2219f13ceeaa90b2ed86c7cae0fe64cd2d2e4

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
<<<<<<< HEAD
    <div className="flex">
=======
    <div className="flex ">
>>>>>>> 99b2219f13ceeaa90b2ed86c7cae0fe64cd2d2e4
      <div>
        <Filters />
      </div>
      <div className="w-full text-center flex mt-20">
        <Paginate products={products} />
      </div>
    </div>
  );
}

export default Products;
