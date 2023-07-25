const PORT = process.env.PORT ?? 8000;
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
/*  */
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

// METHOD GET - Get all tasks from user email
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;

  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1;",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (err) {
    console.log(err);
  }
});

// METHOD POST - Create a new list item
app.post("/todos", (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const id = uuid();

  try {
    const newToDo = pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5);`,
      [id, user_email, title, progress, date]
    );
    res.json(newToDo);
  } catch (err) {
    console.log(err);
  }
});

// METHOD POST - Create an account/user
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const account = await pool.query(
      `INSERT INTO users (email, hashed_pw) VALUES($1, $2)`,
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "2hr" });

    res.json({ email, token });
  } catch (err) {
    console.log(err);
  }
});

// METHOD POST - Auth an user by login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await pool.query(`SELECT* FROM users WHERE email = $1`, [
      email,
    ]);

    if (users.rows.length) return res.json({ detail: "User not found" });
    const pwMatch = await bcrypt.compare(
      password,
      users.rows[0].hashed_pw
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "2hr" });
    if (pwMatch) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (err) {
    console.log(err);
  }
});

// METHOD PUT - Edit & update an existing list item
app.put("/todos/:id", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const { id } = req.params;

  try {
    const editToDo = await pool.query(
      "UPDATE todos SET user_email = $1, title=$2, progress=$3, date=$4 WHERE id=$5;",
      [user_email, title, progress, date, id]
    );
    res.json(editToDo);
  } catch (err) {
    console.log(err);
  }
});

// METHOD DELETE - Delete a list item
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedToDo = await pool.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    res.json(deletedToDo);
  } catch (err) {
    console.log(err);
  }
});
