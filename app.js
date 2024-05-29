const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// INFO: Middleware
app.use(express.json());

// INFO: routes
app.use("/auth", require("./modules/auth"));
app.use("/todos", require("./modules/todo"));
app.use("/notes", require("./modules/note"));
app.use("/upload", require("./modules/upload"));

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
