import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/actions/actions.js';
import Filters from '../../PI Components/Filters/Filters';
import Paginate from '../../PI Components/Paginate/Paginate';
import '../../PI Components/Paginate/Paginate.css';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="flex ">
      <div>
        <Filters />
      </div>
      <div className="w-full text-center flex mt-20">
        <Paginate products={products} />
      </div>
      {/* <div>
        {products.length > 0 && searchProductMsg === "" ? (
          products?.map((el) => <ProductCard {...el} />)
        ) : searchProductMsg.error ? (
          <p>{searchProductMsg.error.slice(6, 47)}</p>
        ) : (
          <div>No se ha encontrado productos</div>
        )}
      </div> */}
    </div>
  );
}

export default Products;
