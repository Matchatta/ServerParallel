const mongoose = require("mongoose")
const Schema = mongoose.Schema

const attendance = new Schema({
    date: Date,
    status: String
})

var attendanceModel = mongoose.model("attdance", attendance)
module.exports = attendanceModel
