import { Badge } from "@material-ui/core";
import {
  PowerSettingsNew,
  ShoppingCartOutlined,
  Update,
  FavoriteBorderOutlined,
  Person,
  PersonAdd,
  PersonAddOutlined,
  PersonAddTwoTone,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { MainContext } from "../Context";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px " })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${mobile({ flex: 1.27, justifyContent: "center" })}
`;
const MenuItemL = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  a {
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
    color: black;
  }
`;
const Logo = styled.div`
  font-weight: bolder;
`;
const Image = styled.img`
  width: 170px;
  ${mobile({ width: "100px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1.27, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  a {
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  ${mobile({ display: "none" })}
`;

const NavBar = () => {
  const value = useContext(MainContext);
  const [cart] = value.cart;
  const [wishList] = value.wishList;
  const [user] = value.user;

  const signOut = value.signOut;
  const history = useHistory();

  const [error, setError] = useState("");

  const handleLogOut = async () => {
    setError("");
    try {
      await signOut();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {!user ? (
            <MenuItem style={{ marginRight: "2rem" }}>
              <Link to="/login">
                <PersonAddOutlined style={{ fontSize: "1.7rem" }} />
                <P>Login</P>
              </Link>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Button onClick={handleLogOut}>
                  <PowerSettingsNew />
                  <P>Log Out</P>
                </Button>
              </MenuItem>
              <MenuItem>
                <Link to="/update">
                  <Update />
                  <P>Update Profile</P>
                </Link>
              </MenuItem>
            </>
          )}
        </Left>
        <Center>
          <Link to="/">
            <Logo>
              <Image src="https://i.ibb.co/Yy7sRps/logo-removebg-preview.png" />
            </Logo>
          </Link>
        </Center>
        <Right>
          <MenuItem>
            <Link to="/wishlist">
              <Badge
                badgeContent={wishList ? wishList.length : 0}
                color="secondary"
              >
                <FavoriteBorderOutlined />
              </Badge>
              <P>Your Wishlist</P>
            </Link>
          </MenuItem>
          <MenuItemL>
            <Link to="/cart">
              <Badge badgeContent={cart ? cart.length : 0} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
              <P>Your Cart</P>
            </Link>
          </MenuItemL>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
