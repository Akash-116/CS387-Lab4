const express = require("express");
const cors = require("cors");
const pool = require("./db");

//middleware
const app = express();
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

// //create a todo

// app.post("/todos", async (req, res) => {
//     try {
//         const { description } = req.body;
//         const newTodo = await pool.query(
//             "INSERT INTO todo (description) VALUES($1) RETURNING *",
//             [description]
//         );

//         res.json(newTodo.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//         // res.json(err.message);
//     }
// });

//get all todos

app.get("/matches", async (req, res) => {
    try {
        const allMatches = await pool.query("SELECT * FROM match order by season_year desc");
        res.json(allMatches.rows);
        // console.log("All matches sent");
    } catch (err) {
        console.error(err.message);
        // res.json(err.message);
    }
});

//get a todo

app.get("/matches/:match_id", async (req, res) => {
    try {
        const { match_id } = req.params;
        const matchDetail = await pool.query("SELECT * FROM match WHERE match_id = $1", [
            match_id
        ]);

        res.json(matchDetail.rows[0]);
    } catch (err) {
        console.error(err.message);
        // res.json(err.message);

    }
});

// //update a todo

// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } = req.body;
//         const updateTodo = await pool.query(
//             "UPDATE todo SET description = $1 WHERE todo_id = $2",
//             [description, id]
//         );

//         res.json("Todo was updated!");
//     } catch (err) {
//         console.error(err.message);
//         // res.json(err.message);

//     }
// });

// //delete a todo

// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//             id
//         ]);
//         res.json("Todo was deleted!");
//     } catch (err) {
//         console.log(err.message);
//         // res.json(err.message);

//     }
// });

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
