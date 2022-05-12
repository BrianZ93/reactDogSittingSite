// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");


// app.use(cors());
// app.use(express.json());


// app.post("/events", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newEvent = await pool.query(
//       "INSERT INTO events (description) VALUES($1) RETURNING *",
//       [description]
//     );

//     res.json(newEvent.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //get all events

// app.get("/events", async (req, res) => {
//   try {
//     const allEvents = await pool.query("SELECT * FROM events");
//     res.json(allEvents.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //get an event

// app.get(`/events/:id`, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const event = await pool.query(`SELECT * FROM events WHERE event_id = event_id`, [
//       id
//     ]);

//     res.json(event.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //update a event

// app.put("/events/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateEvent = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2",
//       [description, id]
//     );

//     res.json("Todo was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //delete a todo

// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//       id
//     ]);
//     res.json("Todo was deleted!");
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// app.listen(5000, () => {
//   console.log("server has started on port 5000");
// });