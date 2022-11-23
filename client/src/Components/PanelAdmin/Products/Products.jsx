import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/actions/actions.js";
import Filters from "../../PI Components/Filters/Filters";
<<<<<<< HEAD
=======
import Paginate from "../../PI Components/Paginate/Paginate";
>>>>>>> 3de35bddf5083c3f5e90ca1ce87672daf43b04de

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const { searchProductMsg } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
<<<<<<< HEAD
    <div>
      <Filters></Filters>
      {products.length > 0 ? (
        products?.map((el) => (
          <ProductCard
            key={el.id}
            id={el.id}
            name={el.name}
            image={el.image}
            brand={el.brand}
            price={el.price}
            categoryName={el.categoryName}
          />
        ))
      ) : (
        <></>
      )}
=======
    <div className="flex">
      <div>
        <Filters />
      </div>
      <Paginate/>
      <div>
        {products.length > 0 && searchProductMsg === "" ? (
          products?.map((el) => (
            <ProductCard
              {...el}
            />
          ))
        ) : searchProductMsg.error ? (
          <p>{searchProductMsg.error.slice(6, 47)}</p>
        ) : (
          <div>No se ha encontrado productos</div>
        )}
      </div>
>>>>>>> 3de35bddf5083c3f5e90ca1ce87672daf43b04de
    </div>
  );
}

export default Products;
