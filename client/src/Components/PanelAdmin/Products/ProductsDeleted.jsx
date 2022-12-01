import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDeleted } from '../../../redux/actions/actions';
import ProductCardToDelete from '../../PanelAdmin/Products/ProductCardToDelete';

function ProductsDeleted() {
  const dispatch = useDispatch();
  const productDeleted = useSelector((state) => state.productsDeleted);
  const msgErrorDelet = useSelector((state) => state.msgProductDeleted);

  useEffect(() => {
    dispatch(getProductDeleted());
  }, [dispatch]);

  console.log(productDeleted);

  return (
    <div className="flex ">
      <div className="w-full text-center flex mt-20">
        <div className="flex flex-wrap justify-evenly ">
          {productDeleted.length > 0 ? (
            productDeleted?.map((el) => (
              <ProductCardToDelete key={el.id} {...el} />
            ))
          ) : msgErrorDelet.length > 0 ? (
            <h2>{`${msgErrorDelet}`}</h2>
          ) : (
            <p>ostras me cago en to joder</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsDeleted;
