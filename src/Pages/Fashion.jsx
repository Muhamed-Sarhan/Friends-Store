import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../Context";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
import Announcment from "../Components/Announcment";
import Newsletter from "../Components/Newsletter";
import Product from "../Components/Product";
import Footer from "../Components/Footer";
import { mobile } from "../responsive";
import { Search } from "@material-ui/icons";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  ${mobile({ width: "0px 20px" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px", display: "none" })}
`;
const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;

  ${mobile({ width: "130px" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 20px;
  padding: 10px 15px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 1px solid lightgray;
  border-radius: 25px;
  cursor: pointer;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  cursor: pointer;
`;
const FFashion = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Fashion = () => {
  const value = useContext(MainContext);
  const [products] = value.products;
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("");
  const [fashion, setFashion] = useState(
    products.filter((p) => p.type === "fashion")
  );

  const dateA = (a, b) => {
    return parseInt(a.productPrice) - parseInt(b.productPrice);
  };
  const dateB = (a, b) => {
    return parseInt(b.productPrice) - parseInt(a.productPrice);
  };

  const sortedA = [...fashion].sort(dateA);
  const sortedB = [...fashion].sort(dateB);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (option === "Price (asc)") {
      setFashion(sortedA);
    } else if (option === "Price (desc)") {
      setFashion(sortedB);
    } else {
      setFashion(fashion);
    }
  }, [option]);

  return (
    <Container>
      <NavBar />
      <Announcment />
      <Title>FASHION</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products :</FilterText>
          <SearchContainer>
            <Input
              placeholder="Search"
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <Search
              style={{
                color: "#555",
                fontSize: "1.2rem",
              }}
            />
          </SearchContainer>
        </Filter>
        <Filter>
          <FilterText>Sort Products :</FilterText>
          <Select
            onChange={(e) => {
              setOption(e.target.value);
            }}
            value={option}
          >
            <Option>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <FFashion>
        {fashion
          .filter((item) => {
            if (search == "") {
              return item;
            } else if (
              item.productName.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item) => {
            return <Product item={item} />;
          })}
      </FFashion>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Fashion;
