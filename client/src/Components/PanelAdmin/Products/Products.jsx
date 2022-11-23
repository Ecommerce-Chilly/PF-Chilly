import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/actions/actions.js";
import Filters from "../../PI Components/Filters/Filters";
import Paginate from "../../PI Components/Paginate/Paginate";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const { productPerPage, page, orders } = useSelector((state) => state);

  const pagination = (_, i) =>
    productPerPage * page <= i && i < productPerPage * (page + 1);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div>
      <Filters />
      <Paginate filtered={products} />
      {products.length > 0 ? (
        products
          ?.filter(pagination)
          .map((el) => (
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
