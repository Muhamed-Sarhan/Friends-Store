import {
  Add,
  Remove,
  Close,
  AddShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Announcment from "../Components/Announcment";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { mobile } from "../responsive";
import { MainContext } from "../Context";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  background-color: #fcf5f5;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  outline: none;
  border: 0.5px solid #000;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  a {
    text-decoration: none;
    color: black;
  }
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  a {
    text-decoration: none;
    color: black;
    &:hover {
      color: crimson;
    }
  }
`;
const Bottom = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", width: "100%" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 1rem;
  position: relative;
  ${mobile({ flexDirection: "column" })}
  a {
    color: black;
    text-decoration: none;
  }
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CartContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-weight: 700;
  margin-top: 20px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const RemoveButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background: none;
  cursor: pointer;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid teal;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  font-weight: 500;
  outline: none;
  &:hover {
    background-color: teal;
    color: white;
  }
`;
const No = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://images3.alphacoders.com/820/820894.jpg") center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Say = styled.h2`
  width: 50%;
  border-radius: 30px;
  text-align: center;
  background-color: rgba(255, 49, 49, 0.7);
  color: white;

  padding: 1rem 2rem;
`;

const WishList = () => {
  const value = useContext(MainContext);
  const [cart] = value.cart;
  const [wishList] = value.wishList;
  const removeFromWishList = value.removeFromWishList;
  const addCart = value.addCart;

  if (wishList.length === 0) {
    return (
      <No>
        <Say>
          Opps .. THERE ISN'T ANY PRODUCTS ...<Link to="/"> GO BACK ?</Link>
        </Say>
      </No>
    );
  } else {
    return (
      <Container>
        <NavBar />
        <Announcment />
        <Wrapper>
          <Title>YOUR WISHLIST</Title>
          <Top>
            <Link to="/">
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
            <TopTexts>
              <TopText>
                <Link to="/wishlist">Your Wishlist ({wishList.length})</Link>
              </TopText>
              <TopText>
                <Link to="/cart">Shoppin Bag ({cart.length})</Link>
              </TopText>
              <TopText></TopText>
            </TopTexts>
            <Link to="/ProductList">
              <TopButton type="filled">WATCH MORE PRODUCTS</TopButton>
            </Link>
          </Top>
          <Bottom>
            <Info>
              {wishList.map((item) => (
                <Product>
                  <RemoveButton onClick={() => removeFromWishList(item.id)}>
                    <Close />
                  </RemoveButton>
                  <Link to={`/Product/${item.id}`}>
                    <ProductDetail>
                      <Image src={item.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {item.productName}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {item.id}
                        </ProductId>
                        <ProductColor color={item.productColor} />
                        <ProductSize>
                          <b>Size:</b> {item.productSize}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                  </Link>
                  <PriceDetail>
                    <ProductPrice>$ {item.productPrice}</ProductPrice>
                    <CartContainer>
                      <Button onClick={() => addCart(item.id)}>
                        Add to Cart <AddShoppingCartOutlined />
                      </Button>
                    </CartContainer>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    );
  }
};

export default WishList;
