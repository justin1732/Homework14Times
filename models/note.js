const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotesSchema = new Schema ({
    body: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;