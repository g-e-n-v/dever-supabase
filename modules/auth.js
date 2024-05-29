const express = require("express");
const supabase = require("../supabase/client");

const controller = express.Router();

controller.post("/sign-up", async (req, res) => {
  const { email, password, ...rest } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: rest,
    },
  });

  if (error) {
    return res.status(error.status).json({
      status: error.status,
      code: error.code,
      name: error.name,
      message: error.message,
    });
  }

  if (data) {
    res.status(200).json(data);
  }
});

controller.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(error.status).json({
      status: error.status,
      code: error.code,
      name: error.name,
      message: error.message,
    });
  }

  return res.status(200).json(data);
});

module.exports = controller;
