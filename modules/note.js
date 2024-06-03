const express = require("express");

const controller = express.Router();

// INFO: Create
controller.post("/", async (req, res) => {
  const supabase = createClient({ req, res });

  const note = req.body;

  const { data, error } = await supabase.from("note").insert([note]).select();

  if (error) {
    return res.status(error.status ?? 400).json({ message: error.message });
  }

  return res.status(200).json(data);
});

// INFO: Get all
controller.get("/", async (req, res) => {
  const supabase = createClient({ req, res });

  const { data, error } = await supabase.from("note").select(`
    *,
    status (name)
  `);

  if (error) {
    return res.status(error.status ?? 400).json({ message: error.message });
  }

  return res.status(200).json(data);
});

// INFO: Get one
controller.get("/:id", async (req, res) => {
  res.send("Method `GET /:id` not implement");
});

// INFO: Update one
controller.put("/:id", async (req, res) => {
  res.send("Method `PUT /:id` not implement");
});

// INFO: Delete one
controller.delete("/:id", async (req, res) => {
  res.send("Method `DELETE /:id` not implement");
});

module.exports = controller;
