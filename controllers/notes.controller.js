const Notes = require("../models/notes.models");
const mongoose = require("mongoose");

const createNotes = async (req, res) => {
    try {
        const {title, description, tags} = req.body;
        if (!title || !description || !tags) {
            return res.status(400).json({message: "Please fill all the fields"});
        };
        const notes = new Notes({
            title,
            description,
            tags,
            userId: req.user.id,
        });
        await notes.save();
        res.status(201).json({message: "Notes created successfully", data: notes});
    } catch (error) {
        console.error("Error creating notes:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

module.exports = {createNotes};