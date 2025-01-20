import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ddd;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
`;

const FooterButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #64c3d5;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #519caf;
  }
`;

const Footer = ({ onSelect }) => {
  return (
    <FooterWrapper>
      <FooterButton onClick={() => onSelect("kouzouzi")}>高蔵寺行き</FooterButton>
      <FooterButton onClick={() => onSelect("home")}>Home</FooterButton>
      <FooterButton onClick={() => onSelect("okazaki")}>岡崎行き</FooterButton>
    </FooterWrapper>
  );
};

export default Footer;
