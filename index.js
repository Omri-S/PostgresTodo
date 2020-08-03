const express = require("express");
const pool = require("./db");
const cors = require("cors");
app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes

//Create todo
app.post("/todos", async (req, res) => {
  try {
    const { desc } = req.body;
    const newTodo = await pool.query(
      `INSERT INTO todo ("desc") VALUES($1) RETURNING *`,
      [desc]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//Get specifig todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//Update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { desc } = req.body;
    const updateTodo = await pool.query(
      `UPDATE todo SET "desc" = $1 WHERE todo_id = $2`,
      [desc, id]
    );
    res.send("Todo updated");
  } catch (error) {}
});

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.send("Todo deleted");
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(5000, () => {
  console.log("server started on port 5000");
});
