import React, { useState } from "react";
import * as Icons from "react-icons/fa";
import "./Navbar.scss";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton.js";
import LogoutButton from "./LogoutButton";
import Button from "./button";
import { useAuth0 } from "@auth0/auth0-react";

const MainNav = styled.div`
  height: 10vh;
  background: none;
  display: flex;
  justify-content: left;
  align-items: center;
  position: absolute;
  width: 100%;
  transition: 350ms;
  z-index: 10;
`;

const NavIcon = styled(Link)`
  z-index: 999;
  margin-left: 2rem;
  font-size: 2.5rem;
  height: 10vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Navbar = () => {

  const { isLoading, error } = useAuth0();

  return (
    <>
      <MainNav>
        <Link to="/" className="navbar-logo">
          J's Dog Sitting
          <Icons.FaDog />
        </Link>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {/* consider a spinning logo component for the loading screen */}
        {!error && !isLoading && (
        <>
        <LoginButton />
        <LogoutButton />
        <Button />
        </>
        )}
      </MainNav>
    </>
  );
}

export default Navbar;