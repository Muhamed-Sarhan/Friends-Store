import {
  AddShoppingCartOutlined,
  FavoriteBorderOutlined,
  Visibility,
} from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MainContext } from "../Context";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  overflow: hidden;
  a {
    text-decoration: none;
    color: black;
  }
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.7s ease;
  &:focus {
    background-color: #e9f5f5;
  }
  &:hover {
    transform: scale(1.2);
    background-color: crimson;
    color: white;
  }
`;
const Price = styled.div`
  position: absolute;
  top: 40px;
  right: -40px;
  transform: rotate(45deg);
  background-color: crimson;
  width: 200px;
  height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: white;
    font-weight: 700;
    font-size: 20px;
  }
`;

const Product = ({ item }) => {
  const value = useContext(MainContext);
  const addCart = value.addCart;
  const addWishlist = value.addWishlist;
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Price>
          <p>{item.productPrice} $</p>
        </Price>
        <Link to="#" onClick={() => addCart(item.id)}>
          <Icon>
            <AddShoppingCartOutlined />
          </Icon>
        </Link>
        <Link to={`/Product/${item.id}`}>
          <Icon>
            <Visibility />
          </Icon>
        </Link>
        <Link to="#" onClick={() => addWishlist(item.id)}>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Link>
      </Info>
    </Container>
  );
};

export default Product;
