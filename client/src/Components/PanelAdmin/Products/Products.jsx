import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/actions/actions.js";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div>
      {products.length > 0 ? (
        products
          ?.map((el) => (
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
    </div>
  );
}

export default Products;
