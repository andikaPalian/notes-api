const express = require("express");
const validateToken = require("../middleware/authMiddleware");
const { createNotes, getAllNotes, getSingleNotes, updateNotes, deleteNotes } = require("../controllers/notes.controller");
const router = express.Router();

router.use(validateToken);
router.post("/create", createNotes);
router.get("/get", getAllNotes);
router.get("/get/:id", getSingleNotes);
router.put("/update/:id", updateNotes);
router.delete("/delete/:id", deleteNotes)

module.exports = router;