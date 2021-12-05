import React, { useContext } from "react";
import styled from "styled-components";
import { MainContext } from "../Context";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HomeProducts = () => {
  const value = useContext(MainContext);
  const [products] = value.products;

  const displayProducts = products.slice(0, 12).map((item) => {
    return <Product item={item} key={item.id} />;
  });

  return (
    <>
      <Container>{displayProducts}</Container>
    </>
  );
};

export default HomeProducts;
