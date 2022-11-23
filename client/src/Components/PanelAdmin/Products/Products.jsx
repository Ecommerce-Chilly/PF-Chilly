import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/actions/actions.js";
import Filters from "../../PI Components/Filters/Filters";
<<<<<<< HEAD
=======
import Paginate from "../../PI Components/Paginate/Paginate";
>>>>>>> fc54c9862ea68ad23a8af581c2a677e9f29483b2

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const { productPerPage, page, searchProductMsg } = useSelector(
    (state) => state
  );

  const pagination = (_, i) =>
    productPerPage * page < i && i <= productPerPage * (page + 1);

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
      <div>
        <Paginate filtered={products} />
        {products.length > 0 && searchProductMsg === "" ? (
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
        ) : searchProductMsg.error ? (
          <p>{searchProductMsg.error.slice(6, 47)}</p>
        ) : (
          <div>No se ha encontrado productos</div>
        )}
      </div>
>>>>>>> fc54c9862ea68ad23a8af581c2a677e9f29483b2
    </div>
  );
}

export default Products;
