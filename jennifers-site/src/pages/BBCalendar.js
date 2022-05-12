import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import { parseISO } from 'date-fns'
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth0 } from '@auth0/auth0-react';
import { uid } from "uid";
import 'cors';
import { masterUserId } from '../index';

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Booked",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
        event_id: "",
        user_id: ""
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
        event_id: "",
        user_id: ""
    },
    {
        title: "Semi-Booked (Contact us for more information)",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
        event_id: "",
        user_id: ""
    },
];


const fetchedEvents = [
    {
        title: "Booked",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
        event_id: "",
        user_id: ""
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
        event_id: "",
        user_id: ""
    },
    {
        title: "Semi-Booked (Contact us for more information)",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
        event_id: "",
        user_id: ""
    },
];

function Calendarx () {

    const { user, isAuthenticated } = useAuth0();

    let user_string  = ''


    if (isAuthenticated) {
        const user_id = JSON.stringify(user.sub)

        if (Object.values(user_id).length == 32) {
            for (let i=(Object.values(user_id).length) - 25; i < Object.values(user_id).length-1; i++) {
                user_string += Object.values(user_id)[i];
        }}
        if (Object.values(user_id).length == 37) {
            for (let i=(Object.values(user_id).length) - 22; i < Object.values(user_id).length-1; i++) {
                user_string += Object.values(user_id)[i];
            }

    }}

    useEffect(() => {
        fetchEvents();
    }, [])

        
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: ""});
    const [allEvents, setAllEvents] = useState(events);

    const [fetchedEvent, setFetchedEvent] = useState({ title: "", start_date: "", end_date: "", user_id: "", event_id: "" });
    const [allFetchedEvents, setAllFetchedEvents] = useState(fetchedEvents);


    const [deletedEvent, setDeletedEvent] = useState( { event_id: "" } );
   

// *** FETCHED EVENTS ***

    const [firstFetch, setFirstFetch] = useState(true)

    const fetchEvents = async () => {
        const response = await fetch("https://jsdogsitting.herokuapp.com/api/events")
        .then((response) => response.json())
        JSON.stringify(response)


        while (response.length > allEvents.length - 3) {


            setNewEvent( { title: response[allEvents.length-3].title.toUpperCase()} );
    
            let start_date = parseISO(response[allEvents.length-3].start_date, 1)
            setNewEvent( { start: start_date} )
    
            let end_date  = parseISO(response[allEvents.length-3].end_date, 1)
            setNewEvent( { title: response[allEvents.length-3].title.toUpperCase(), start: start_date , end: end_date} )
            setAllEvents([...allEvents, newEvent])
            
            try {
                allEvents.push(newEvent)
                allEvents[allEvents.length-3] = { title: response[allEvents.length-3].title.toUpperCase(), start: start_date , end: end_date}
            } catch {
                console.log("last event not updated")
            }
    
        }

        if (firstFetch) {
            setNewEvent( { title: response[response.length-2].title.toUpperCase()} );
        
            let start_date = parseISO(response[response.length-2].start_date, 1)
            setNewEvent( { start: start_date} )

            let end_date  = parseISO(response[response.length-2].end_date, 1)
            setNewEvent( { title: response[response.length-2].title.toUpperCase(), start: start_date , end: end_date} )
            setAllEvents([...allEvents, newEvent])
            
            allEvents.push(newEvent)
            setFirstFetch(false)

            setNewEvent( {title: "", start: "", end: ""} )
        }
    };


// *** END OF FETCHED EVENTS ***



    function handleAddEvent() {
        fetchedEvent.event_id = uid(6);
        if (newEvent.title !== '' && newEvent.start_date !== '' && newEvent.end_date !== '' && fetchedEvent.user_id !== '') {
        fetchedEvent.title = newEvent.title;
        fetchedEvent.start_date = newEvent.start;
        fetchedEvent.end_date = newEvent.end;
        setAllFetchedEvents([...allFetchedEvents, fetchedEvent])
        setAllEvents([...allEvents, newEvent])
        const postEvent = async () => {
            const response = await fetch("https://jsdogsitting.herokuapp.com/api/events", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(fetchedEvent)
            });

            if (response.ok) {
                console.log("response worked!");
                fetchEvents();
                console.log(newEvent)
                console.log(allEvents)
            } else {
                console.log("response failed")
                console.log(fetchedEvent)
            }
    }
    postEvent();
    } else {
        window.alert('Please complete all required fields')
    }};

    function handleDeleteEvent() {
        const deleteEvent = async () => {
            const response = await fetch(`https://jsdogsitting.herokuapp.com/api/events/${deletedEvent.event_id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                console.log(`${deletedEvent.event_id} has been deleted!`);
            } else {
                window.alert(`${deletedEvent.event_id} delete failed`)
            }
        }

        deleteEvent();
    }

    if ({user_string} == masterUserId) {
    return (
        <div className="calendar" style={{ padding: "10vh" }}>
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title (Booked, Vacation, Semi-Booked" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <input type="text" placeholder="User ID (If unknown type N/A)" style={{ width: "20%", marginRight: "10px" }} value={fetchedEvent.user_id} onChange={(event) => setFetchedEvent({ ...fetchedEvent, user_id: event.target.value })} />
                <br></br>
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
            <h1>*Semi-booked means there are other dogs that day but we still have room for more bookings</h1>
            <input type="text" placeholder="Event ID" style={{ width: "20%", marginRight: "10px" }} value={deletedEvent.event_id} onChange={(event) => setDeletedEvent({ ...deletedEvent, event_id: event.target.value })} />
                <br></br>
            <button stlye={{ marginTop: "10px" }} onClick={handleDeleteEvent}>
                    Delete Event
            </button>
        </div>
    );
    }
    return (
        <div className="calendar" style={{ padding: "10vh"}}>
            <h1>Calendar</h1>
            <h2>Check Availability</h2>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "5vh 0 0 0" }} />
            <h1>*Semi-booked means there are other dogs that day but we still have room for more bookings</h1>
        </div>
    )
}

export default Calendarx;
