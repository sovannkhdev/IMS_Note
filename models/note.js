const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    noteStatus: String,
    staffName: String,
    noteDate: {
        type: Date,
        default: new Date(),
    },
    notetext: String
})

const NotePost = mongoose.model('notepost', NoteSchema)

module.exports = NotePost