import React, { useRef, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MainContext } from "../Context";

import styled from "styled-components";
import { mobile } from "../responsive";

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

const Button = styled.button`
  min-width: 40%;
  flex: 1;
  border: none;
  outline: none;
  margin: 20px 10px 0 0;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;
const Cancel = styled.button`
  min-width: 40%;
  flex: 1;
  border: none;
  outline: none;
  margin: 20px 10px 0 0;
  padding: 15px 20px;
  cursor: pointer;
  background-color: #e63434;
  color: white;
  a {
    text-decoration: none;
    color: white;
  }
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

const UpdateProfile = () => {
  const value = useContext(MainContext);
  const [user] = value.user;
  const updateEmail = value.updateEmail;
  const updatePassword = value.updatePassword;
  const history = useHistory();

  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      return setError("Password don't match");

    const promises = [];
    setError("");
    if (emailRef.current.value !== user.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to Update your Email");
      });
  };

  return (
    <Container>
      <Wrapper>
        {error ? <ErrMass>{error}</ErrMass> : ""}
        <Title>UPDATE YOUR ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            type="text"
            ref={userNameRef}
            required
          />
          <Input
            placeholder="email"
            type="email"
            ref={emailRef}
            defaultValue={user.email}
            required
          />
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

          <Button type="submit">UPDATE</Button>
          <Cancel>
            <Link to="/">CANCEL</Link>
          </Cancel>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default UpdateProfile;
