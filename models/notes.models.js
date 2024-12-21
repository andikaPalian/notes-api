const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: [String], required: true},
    createdOn: {type: Date, default: Date.now},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Notes", notesSchema);