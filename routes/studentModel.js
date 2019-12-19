const mongoose = require("mongoose")
const Schema = mongoose.Schema

const attdance = new Schema({
    date: Date,
    week: Number,
    status: String
})
const student = new Schema({
    sid: String,
    name: String,
    sirname: String,
    section: Number,
    attdance: [attdance]
}, {collection: "class"})

var studentModel = mongoose.model("class", student)
var attendanceModel = mongoose.model("attendance", attdance)
module.exports = studentModel
module.attendance = attendanceModel
