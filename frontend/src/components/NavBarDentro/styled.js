import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavLink = styled(Link)`
  color: #17255a;
  font-size: 20px;
  text-decoration: none;
  font-weight: bold;
  margin-left: 2%;
  margin-right: 2%;
`;

export const LogoContainer = styled.div`
margin-right: auto; 
`;

export const NavLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1px;
`;

export const Void = styled.div``;

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  width: 25vw;
`;
export const Logout = styled.div``;
