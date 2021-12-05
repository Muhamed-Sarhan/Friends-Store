import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useHistory } from "react-router-dom";
import { MainContext } from "../Context";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://i.ibb.co/QkLqq1y/a1.webp") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  border: 1px solid gray;
  outline: none;
  padding: 10px;
  font-size: 0.99rem;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  outline: none;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
  margin-bottom: 10px;
`;
const LinkA = styled.p`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const ErrMass = styled.p`
  background-color: rgba(252, 67, 67, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: white;
  margin: 0 0 0.7rem 0;
`;

const Login = () => {
  const value = useContext(MainContext);
  const [user] = value.user;
  const login = value.login;

  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        {error ? <ErrMass>{error}</ErrMass> : ""}
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            type="email"
            ref={emailRef}
            autoComplete="off"
          />
          <Input
            placeholder="password"
            type="password"
            ref={passwordRef}
            autoComplete="off"
          />
          <Button type="submit">LOGIN</Button>
        </Form>
        <LinkA>
          <Link to="/register">CREATE A NEW ACCOUNT</Link>
        </LinkA>
        <LinkA style={{ marginTop: "15px" }}>
          <Link to="/forget-password">FORGET PASSWORD ?</Link>
        </LinkA>
      </Wrapper>
    </Container>
  );
};

export default Login;
