const express = require("express");
const validateToken = require("../middleware/authMiddleware");
const { createNotes } = require("../controllers/notes.controller");
const router = express.Router();

router.use(validateToken);
router.post("/create", createNotes);

module.exports = router;