const express = require("express");

const app = express();

const port = 3000;

// INFO: Middleware
app.use(express.json());

// INFO: routes
app.use("/todos", require("./modules/todo"));
app.use("/persons", require("./modules/person"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
