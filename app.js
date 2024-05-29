const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// INFO: Middleware
app.use(express.json());

// INFO: routes
app.use("/auth", require("./modules/auth"));
app.use("/todos", require("./modules/todo"));
app.use("/persons", require("./modules/person"));

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
