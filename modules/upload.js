const express = require("express");
const multer = require("multer");

const supabase = require("../supabase/client");
const upload = multer();

const controller = express.Router();

controller.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;

  const [_, fileName, ext] = file.originalname.match(/^(.*)\.(.*)$/);

  if (!file) {
    return res.status(400).json({ message: "File not found!" });
  }

  if (!ext) {
    return res.status(400).json({ message: "File doesn't have extension!" });
  }

  const { data, error } = await supabase.storage
    .from("base")
    .upload(`${fileName}-${Date.now().valueOf()}.${ext}`, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    return res.status(error.status ?? 400).json({ message: error.message });
  }

  return res.status(200).json(data);
});

controller.get("/:fileName", async (req, res) => {
  const { fileName } = req.params;
  const { data } = await supabase.storage.from("base").getPublicUrl(fileName);

  return res.status(200).json(data);
});

module.exports = controller;
