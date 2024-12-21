const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const DB = require("./config/db");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
DB();

app.use("/user", require("./routes/user.routes"));
app.use("/notes", require("./routes/notes.routes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});