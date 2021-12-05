import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useHistory, Link } from "react-router-dom";
import { MainContext } from "../Context";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://i.ibb.co/zQsnnk3/FRIENDS-Pictured-Set-of-Central-Perk-in-Friends-Photo-by-Gary-Null-NBC-NBCU-Photo-Bank-via-Getty-Ima.jpg")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  border: 1px solid gray;
  outline: none;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  outline: none;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;
const LinkA = styled.p`
  margin: 20px 0 0 0;
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

const Register = () => {
  const value = useContext(MainContext);
  const [user] = value.user;
  const register = value.register;

  const history = useHistory();

  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      return setError("Password don't match");

    try {
      setError("");
      await register(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        {error ? <ErrMass>{error}</ErrMass> : ""}
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            type="text"
            ref={userNameRef}
            required
          />
          <Input placeholder="email" type="email" ref={emailRef} required />
          <Input
            placeholder="password"
            type="password"
            ref={passwordRef}
            required
          />
          <Input
            placeholder="confirm password"
            type="password"
            ref={confirmPasswordRef}
            required
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
        <LinkA>
          <Link to="/login">ALREADY HAVE AN ACCOUNT ?</Link>
        </LinkA>
      </Wrapper>
    </Container>
  );
};

export default Register;
