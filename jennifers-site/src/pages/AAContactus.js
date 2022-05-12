import React from "react";

function Contactus() {
  return (
    <>
    <div className="contactuscontainer">
		  <div className="contact-box">
			  <div className="contactleft"></div>
			  <div className="contactright">
				  <h2 className="contacth2">Contact Us</h2>
          <input type="text" className="field" placeholder="Your Name"/>
          <input type="text" className="field" placeholder="Your Email"/>
          <input type="text" className="field" placeholder="Phone"/>
          <textarea placeholder="Message" className="field"></textarea>
          <button className="contactbtn">Send</button>
		  	</div>
		</div>
	</div>
  </>
  );
}

export default Contactus;