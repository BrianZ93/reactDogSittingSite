import React, { useState, useEffect } from 'react';
import videoBG from '../assets/videos/puppiesbackground.mp4';
import Clear from '../assets/images/sunny.jpg';
import Cloudy from '../assets/images/cloudy.jpg';
import Overcast from '../assets/images/overcast.jpg';
import Rainy from '../assets/images/rainy.jpg';
import Snow from '../assets/images/snow.jpg';
import { Button } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { useAuth0 } from '@auth0/auth0-react';
  

function Dashboard () {

  let user_string  = ''

  let fetchurl = 'https://jsdogsitting.herokuapp.com/api/users/'

  let user_id = ''

// *** PROFILE BLOCK ***

  const { user, isAuthenticated } = useAuth0();

  const [userName, setUserName] = useState(" ");
  const [dogsName, setDogsName] = useState(" ");
  const [dogBreed, setDogBreed] = useState(" ");
  const [dogAge, setDogAge] = useState(" ");
  const [profileInformation, setProfileInformation] = useState( { user_id: user_string, username: " ", dogsname: " ", dogbreed: " ", dogage: " " } )
  
  const [open, setOpen] = useState(false);

  // *** NEW ACCOUNT SETUP ***

  const newAccountStartUp = async () => {
    let newUser = true
    if (isAuthenticated) {
      const response = await fetch('https://jsdogsitting.herokuapp.com/api/users')
      .then(response => response.json())
      JSON.stringify(response)

      let new_user_string = ''

      let new_user_id = JSON.stringify(user.sub)

      let users = []

      if (Object.values(new_user_id).length == 32) {
        for (let i=(Object.values(new_user_id).length) - 25; i < Object.values(new_user_id).length-1; i++) {
          new_user_string += Object.values(new_user_id)[i];
      }}
      if (Object.values(new_user_id).length == 37) {
        for (let i=(Object.values(new_user_id).length) - 22; i < Object.values(new_user_id).length-1; i++) {
          new_user_string += Object.values(new_user_id)[i];
      }}

      const accountCheck = () => {

        for (let i=0; i < response.length; i++) {

          users.push(Object.values(response)[i].user_id)

          if (users[i] == new_user_string) {
            newUser = false

          }

        }

      }

      accountCheck();

        if (newUser == false) {
          console.log("not a new user")
        } else {
          console.log("new user")
          const addNewAccount = async () => {

            setProfileInformation((profileInformation.user_id) = {new_user_string} )
            setProfileInformation(profileInformation.username = "(Update Profile)")
            setProfileInformation(profileInformation.dogsname = "(Update Profile)")
            setProfileInformation(profileInformation.dogbreed = "(Update Profile)")
            setProfileInformation(profileInformation.dogage = "(Update Profile)")

            const response2 = await fetch('https://jsdogsitting.herokuapp.com/api/users', {
              method: 'POST',
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify(profileInformation)
            });
          }
          addNewAccount();
      }
    }

    
    


  }

  newAccountStartUp();

  // *** END OF NEW ACCOUNT SETUP ***

  const checkUser = async () => {

    if (isAuthenticated) {
        user_string  = ''
        user_id = JSON.stringify(user.sub)


        if (Object.values(user_id).length == 32) {
            for (let i=(Object.values(user_id).length) - 25; i < Object.values(user_id).length-1; i++) {
              user_string += Object.values(user_id)[i];
        }}
        if (Object.values(user_id).length == 37) {
            for (let i=(Object.values(user_id).length) - 22; i < Object.values(user_id).length-1; i++) {
              user_string += Object.values(user_id)[i];
            }
          }
        
          fetchurl += user_string

          const response = await fetch(fetchurl)
          .then((response) => response.json())
          JSON.stringify(response)

    
          setUserName(response.username)
          setDogsName(response.dogsname)
          setDogBreed(response.dogbreed)
          setDogAge(response.dogage)


          setProfileInformation(profileInformation.user_id = user_string)
          setProfileInformation(profileInformation.username = response.username)
          setProfileInformation(profileInformation.dogsname = response.dogsname)
          setProfileInformation(profileInformation.dogbreed = response.dogbreed)
          setProfileInformation(profileInformation.dogage = response.dogage)

    
          setProfileInformation({ ...profileInformation, user_id: user_string, username: response.username, dogsname: response.dogsname, dogbreed: response.dogbreed, dogage: response.dogage })

        }
      };
  

  
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false)
    updateProfile();
    };

  function updateProfile() {
    const updateProfile2 = async () => {
      if (isAuthenticated) {
        user_string  = ''
        user_id = JSON.stringify(user.sub)


        if (Object.values(user_id).length == 32) {
            for (let i=(Object.values(user_id).length) - 25; i < Object.values(user_id).length-1; i++) {
              user_string += Object.values(user_id)[i];
        }}
        if (Object.values(user_id).length == 37) {
            for (let i=(Object.values(user_id).length) - 22; i < Object.values(user_id).length-1; i++) {
              user_string += Object.values(user_id)[i];
            }
          }
      }
        
          fetchurl += user_string
      setProfileInformation( { ...profileInformation, user_id: user_string } )
       const response = await fetch(fetchurl, {
          method: "PUT",
          headers: {
              "Content-Type" : "application/json"
        },
        body: JSON.stringify(profileInformation)
      });
      setUserName(profileInformation.username)
      setDogsName(profileInformation.dogsname)
      setDogBreed(profileInformation.dogbreed)
      setDogAge(profileInformation.dogage)
  }
  updateProfile2();
  };

  
  // *** END OF PROFILE BLOCK ***

  
// Weather API

  const [place, setPlace] = useState('Naperville')
  const [placeInfo, setPlaceInfo] = useState('')

  const fetchWeather = async () => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fb5b6972ca3242819e1142403220105&q=${place}&days=1&aqi=no&alerts=no`)
    .then(response => response.json())
    .then(data => 
      setPlaceInfo({
        name: data.location.name,
        region: data.location.region,
        farenheit: {
          current: Math.floor(data.current.temp_f),
          feel: Math.floor(data.current.feelslike_f),
        },
        condition: data.current.condition.text
      })
    )
    console.log('api pulled');
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

// End of Weather API

// Appointment Data Table
  useEffect(() => {
    fetchWeather();
    checkUser();
  }, [])



  return (
    <>
    <div className='welcomevideo'>
      <video src={videoBG} autoPlay loop muted />
    </div>
    <div className="dashboard">
      <h1 className="dashboardtitle"></h1>
      <div className="dashboardgrid">
        <figure className="dashitem1">
          <div>
            <h1 className="dashprofiletitle">{userName}</h1>
            <h2 className="dashprofilesubtitle">Dog's Name: {dogsName}</h2>
            <h3 className="dashprofilesubtitle2">Breed: {dogBreed}</h3>
            <h3 className="dashprofilesubtitle2">Age: {dogAge}</h3>
          </div>
          <div className="dashAppointments">
            Upcoming Appointments
          </div>
          <div className="clientappointments">
            <span>You have no upcoming appointments</span>
          </div>
          <button className="updateprofilebtn" type="submit" onClick={handleClickToOpen}> Update Profile</button>

          <Dialog open={open} onClose={handleToClose}>
            <DialogTitle className="dashdialoguetitle">{"Profile Information"}</DialogTitle>
              <DialogContent>
                <DialogContentText className="dashlistitemtitle">
                Input New Profile Information
                </DialogContentText>
                <DialogContent>
                  <TextField value={profileInformation.username} onChange={(e) => setProfileInformation({ ...profileInformation, username: e.target.value })} id="filled-basic" label="Username" variant="filled" />
                </DialogContent>
                <DialogContent>
                  <TextField value={profileInformation.dogsname} onChange={(e) => setProfileInformation({ ...profileInformation, dogsname: e.target.value })} id="filled-basic" label="Your Dog's Name" variant="filled" />
                </DialogContent>
                <DialogContent>
                  <TextField value={profileInformation.dogbreed} onChange={(e) => setProfileInformation({ ...profileInformation, dogbreed: e.target.value })} id="filled-basic" label="Breed" variant="filled" />
                </DialogContent>
                <DialogContent>
                  <TextField value={profileInformation.dogage} onChange={(e) => setProfileInformation({ ...profileInformation, dogage: e.target.value })} id="filled-basic" label="Your Dog's Age" variant="filled" />
                </DialogContent>
              </DialogContent>
              <DialogActions className="dashdialoguebuttons">
                <Button 
                variant="contained"
                onClick={handleSubmit} 
                color="primary" autoFocus
                >
                  Submit
                </Button>
                <Button 
                variant = "outlined"
                onClick={handleToClose} 
                color="primary" autoFocus
                >
                  Close
                </Button>
              </DialogActions>
          </Dialog>
        </figure>
        <figure>

          <figure className="dashitem2" style={
            placeInfo.condition?.toLowerCase() === "clear" ||
            placeInfo.condition?.toLowerCase() === "sunny"
              ? { backgroundImage: `url(${Clear})` }
              : placeInfo.condition?.includes("cloudy")
              ? { backgroundImage: `url(${Cloudy})` }
              : placeInfo.condition?.toLowerCase().includes("rainy")
              ? { backgroundImage: `url(${Rainy})` }
              : placeInfo.condition?.toLowerCase().includes("snow")
              ? { backgroundImage: `url(${Snow})` }
              : { backgroundImage: `url(${Overcast})` }
          }>
            <h1>{placeInfo.name},{placeInfo.region}</h1>
            <span className="weatherspan1">{placeInfo.condition}</span>
            <span>{dateBuilder(new Date())}</span>
            <div className="weatherbox">
              <ul className="weathersidebyside">
                <li>
                  <ol className="temp">{placeInfo.farenheit?.current}°</ol>
                  <ol className="tempdesc">Today</ol>
                </li>
                <li>
                  <ol className="temp">{placeInfo.farenheit?.feel}°</ol>
                  <ol className="tempdesc">Feels Like</ol>
                </li>
              </ul>
            </div>
          </figure>
        <figure className="dashitem3">
          <div>

          </div>
        </figure>
      </figure>
      <figure className="dashitem4">
          <div>
          </div>
        </figure>
    </div>
    </div>
    </>
  )
}

export default Dashboard