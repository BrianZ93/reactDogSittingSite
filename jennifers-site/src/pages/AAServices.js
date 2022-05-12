import React from "react";
import dogPlaying from "./../assets/images/dogPlaying.png";
import dogSleeping from "./../assets/images/dogSleeping.jpg";
import dogCar from "./../assets/images/dogCar.jpg";
import ScrollButton from './../components/ScrollButton';

function Services() {

  return (
    <>
    <ScrollButton />
    <section className="servicesintro">
      <div>
        <ul className="serviceslist">
          <li>
            <h1>Services</h1>
          </li>
          <li>
            <p class="servicessubhead"><span><a href="/services#dogsitting" className="serviceslink">Dogsitting</a></span><span className="spanspace"> | </span><span><a href="/services#pickup" className="serviceslink">Pickup/Dropoff</a></span><span className="spanspace"> | </span><span><a href="/services#extendedstays" className="serviceslink">Extended Stays</a></span></p>
          </li>
        </ul>
      </div>
    </section>
    <div className="servicesmaingrid">
      <figure id="dogsitting" className="servicesitem1-1">
        <h1 className="servicesheading">Dogsitting</h1>
        <p1 className="servicestext">Your dog will be watched with Jennifer's dog Freddy who loves meeting new dog friends! Before your dog's stay Jennifer will be asking for all pertinent information required to make sure your dog has the best experience possible.</p1>
      </figure>
      <figure className="servicesitem1-2">
        <img alt="" src={dogPlaying} className="servicesimage"/>
      </figure>
      <figure id="pickup" className="servicesitem2-1">
      <h1 className="servicesheading">PickUp/Dropoff</h1>
        <p1 className="servicestext">If you live within our pickup/dropoff radius we will pick your dog up and drop them off at your designated drop off point!</p1>
      </figure>
      <figure className="servicesitem2-2">
        <img alt="" src={dogCar} className="servicesimage"/>
      </figure>
      <figure id="extendedstays" className="servicesitem3-1">
      <h1 className="servicesheading">Extended Stays</h1>
        <p1 className="servicestext">We allow for longer stays whenever we can accomodate your need.</p1>
      </figure>
      <figure className="servicesitem3-2">
        <img alt="" src={dogSleeping} className="servicesimage"/>
      </figure>
    </div>
    </>
  );
}

export default Services;