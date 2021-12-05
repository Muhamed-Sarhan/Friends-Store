import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

import Product from "./Product";
import { mobile } from "./../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Pagination = styled.div`
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  ${mobile({ width: "90%" })}
`;

const Products = ({ productsforEachPage, search, products }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = productsforEachPage;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = products
    .filter((item) => {
      if (search == "") {
        return item;
      } else if (
        item.productName.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    })
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((item) => {
      return <Product item={item} key={item.id} />;
    });

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Container>{displayProducts}</Container>
      <Pagination>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </Pagination>
    </>
  );
};

export default Products;
