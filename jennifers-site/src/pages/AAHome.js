import React, { useState, useEffect } from "react";
import videoBG from '../assets/videos/puppiesbackground.mp4';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


function Home (){

  const { isLoading, setIsLoading } = useAuth0(true);

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

  const [color, setColor] = useState("rgb(50, 146, 133)")

  if (isLoading) {
    return (
      <div className="loading">
        <BounceLoader color={color} loading={isLoading} css={override} size={250} />
      </div>
    )
  } else {
  return (
    <>
    <div className='welcomevideo'>
        <video src={videoBG} autoPlay loop muted />
    </div>
    <header className="viewport-header">
      <h1 className="homeheader">
        <span>&nbsp;Your Dog's Second Home</span>
      </h1>
    </header>
    <main className="hometext">
      <div>Jennifer is the owner of a labradoodle named Freddy who loves sharing his home with new and old dog friends!</div>
      <span>Our home accomodates both long and short term stays, we have provided a calendar to show which dates we are available and when we are booked</span>
      <br></br>
      <Link to="/calendar">
        <button className="homebtn" to="/calendar">Check Our Availability</button>
      </Link>
    </main>
    </>
  );
}}

export default Home;