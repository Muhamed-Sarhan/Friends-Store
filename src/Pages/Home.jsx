import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import Announcment from "../Components/Announcment";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import HomeProducts from "../Components/HomeProducts";
import NavBar from "../Components/NavBar";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Products";
import Slider from "../Components/Slider";

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 2rem;
  a {
    padding: 10px 20px;
    background-color: teal;
    color: white;
    text-decoration: none;
    font-weight: 600;
  }
`;
const CategoryTitle = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  span {
    font-size: 6rem;
    color: teal;
    font-weight: 900;
  }
  strong {
    font-size: 3rem;
    color: rgb(0, 0, 0);
    font-weight: 900;
    margin-left: -40px;
    margin-top: -10px;
  }
`;
const ProductsTitle = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 50px;
  span {
    font-size: 6rem;
    color: teal;
    font-weight: 900;
    margin-right: -100px;
  }
  strong {
    font-size: 3rem;
    color: rgb(0, 0, 0);
    font-weight: 900;
  }
`;

const Home = () => {
  return (
    <div>
      <Announcment />
      <NavBar />
      <Slider />
      <CategoryTitle>
        <span>C</span>
        <strong>ategories</strong>
      </CategoryTitle>
      <Categories />
      <ProductsTitle>
        <span>P</span>
        <strong>Our roducts</strong>
      </ProductsTitle>
      <HomeProducts />
      <Button>
        <Link to="/productlist">SEE ALL PRODUCTS</Link>
      </Button>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
