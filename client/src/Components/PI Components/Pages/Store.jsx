import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/actions/actions.js";
import Filters from "../../PI Components/Filters/Filters";
import Paginate2 from "../../PI Components/Paginate/PaginateToStore";
import "../../PI Components/Paginate/Paginate.css";

function Store() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="flex ">
      <div>
        <Filters setPageNumber={setPageNumber} />
      </div>
      <div className="w-full text-center flex mt-20">
        <Paginate2
          products={products}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
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

export default Store;
