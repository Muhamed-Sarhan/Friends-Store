import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	height: 30px;
	background: teal;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-style: 14px;
	font-weight: 500;
`;

const Announcment = () => {
	return <Container>Super Deal! Free Shipping on Order Over 50$</Container>;
};

export default Announcment;
