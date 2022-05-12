import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';




function Button() {

  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <Link to="dashboard">
        <button className="dashbtn">My Dashboard</button>
      </Link>
    );
}}

export default Button;