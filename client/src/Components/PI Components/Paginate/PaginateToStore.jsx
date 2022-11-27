import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import ProductCard from '../../PanelAdmin/Products/ProductCard';
// import "./Paginate.css";

function Paginate({ products }) {
  const { searchProductMsg } = useSelector((state) => state);
  const [productOffset, setProductOffset] = useState(0);
  const productsPerPage = 25;

  const endOffset = productOffset + productsPerPage;
  const currentItems = products.slice(productOffset, endOffset);
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    setProductOffset(newOffset);
  };

  useEffect(() => {
    setProductOffset(0);
  }, [products]);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        pageLinkClassName={'page-num'}
        previousLinkClassName={'page-num'}
        nextLinkClassName={'page-num'}
        activeLinkClassName={'active'}
      />
      <div className="flex flex-wrap justify-evenly">
        {currentItems.length > 0 && searchProductMsg === '' ? (
          currentItems?.map((el) => (
            <ProductCard
              key={el.id}
              id={el.id}
              name={el.name}
              image={el.image}
              brand={el.brand}
              price={el.price}
            />
          ))
        ) : searchProductMsg.error ? (
          <p>{searchProductMsg.error}</p>
        ) : (
          <div>Products not found</div>
        )}
      </div>
    </>
  );
}

export default Paginate;
