const express = require("express");
const cors = require("cors");

const mongoose = require("./db");
const Note = require("./models/Note");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {

    res.json({
        status: "healthy",
        app: "Niza Notes API",
        version: "1.0"
    });

});

app.get("/api/about", (req, res) => {

    res.json({
        name: "Ashish",
        role: "DevOps Engineer",
        project: "Kubernetes Notes App"
    });

});

app.post("/api/notes", async (req, res) => {

    const note = new Note({
        title: req.body.title
    });

    await note.save();

    res.json({
        message: "Note Saved",
        note
    });

});

app.get("/api/notes", async (req, res) => {

    const notes = await Note.find();

    res.json(notes);

});

app.put("/api/notes/:id", async (req, res) => {

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title
        },
        {
            new: true
        }
    );

    res.json({
        message: "Note Updated Successfully",
        note: updatedNote
    });

});

app.delete("/api/notes/:id", async (req, res) => {

    await Note.findByIdAndDelete(req.params.id);

    res.json({
        message: "Note Deleted Successfully"
    });

});

app.listen(3000, () => {

    console.log("Server running on port 3000");

});
