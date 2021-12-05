import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Announcment from "../Components/Announcment";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Newsletter from "../Components/Newsletter";
import { mobile } from "../responsive";
import { MainContext } from "../Context";
import { useParams } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.img`
  flex: 1;
  max-width: 600px;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${mobile({ height: "50vh" })} {
    /*&:hover {
    background-size: 150%;
    border: 1px solid #ddd;
    cursor: zoom-in;
  }*/
  }
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  margin-top: 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 400;
  text-transform: uppercase;
`;
const Describtion = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-size: 40px;
  font-weight: 100;
`;
const FilterContainer = styled.div`
  display: flex;
  margin: 50px 0;
  width: 70%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 7px;
  outline: none;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  transition: all 0.5s ease;
  font-weight: 500;
  outline: none;
  &:hover {
    background-color: teal;
    color: white;
  }
`;

const Thumb = styled.div`
  display: flex;
  cursor: pointer;

  img {
    width: 100px;
    margin: 20px;
    overflow: hidden;
  }
`;

const Product = () => {
  const { id } = useParams();

  const [index, setIndex] = useState(0);
  const imgRef = useRef();

  const value = useContext(MainContext);
  const addCart = value.addCart;
  const [products] = value.products;
  const getProduct = [products[id - 1]];

  console.log("---------0--------", getProduct);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgRef.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <NavBar />
      <Announcment />
      {getProduct.map((detail) => (
        <Wrapper>
          <ImgContainer
            src={detail.images[index]}
            onMouseMove={handleMouseMove}
            //  style={{ backgroundImage: `url(${detail.img})` }}
            ref={imgRef}
            onMouseLeave={() =>
              (imgRef.current.style.backgroundPosition = `center`)
            }
          />

          <InfoContainer>
            <Title>{detail.productName}</Title>
            <Describtion>{detail.productDesc}</Describtion>
            <Price>$ {detail.productPrice}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor color="black" />
                <FilterColor color="gray" />
                <FilterColor color="orange" />
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize>
                  <FilterSizeOption>XS</FilterSizeOption>
                  <FilterSizeOption>S</FilterSizeOption>
                  <FilterSizeOption>M</FilterSizeOption>
                  <FilterSizeOption>L</FilterSizeOption>
                  <FilterSizeOption>XL</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <Button onClick={() => addCart(detail.id)}>Add to Cart</Button>
            </AddContainer>
            <Thumb>
              {detail.images.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  alt="similar"
                  onClick={() => setIndex(index)}
                />
              ))}
            </Thumb>
          </InfoContainer>
        </Wrapper>
      ))}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
