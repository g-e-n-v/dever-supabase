const express = require("express");
const { createClient } = require("../supabase/client");

const controller = express.Router();

controller.post("/sign-up", async (req, res) => {
  const supabase = createClient({ req, res });
  const { email, password, ...rest } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: rest,
    },
  });

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(200).json(data);
});

controller.post("/sign-in", async (req, res) => {
  const supabase = createClient({ req, res });
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(200).json({ email: data.user.email });
});

controller.post("/refresh-token", async (req, res) => {
  const supabase = createClient({ req, res });

  const { refresh_token } = req.body;
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(200).json(data);
});

controller.get("/me", async (req, res) => {
  const supabase = createClient({ req, res });

  const token = req.headers.authorization.replace("Bearer ", "");
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(200).json(data);
});

module.exports = controller;
