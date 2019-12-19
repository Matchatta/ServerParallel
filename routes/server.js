const express = require("express")
const app =express()
const mongoose = require("mongoose")
const Student = require("./studentModel")
const mogoUrl = "mongodb+srv://oong:oong2543@cluster0-pjrmc.gcp.mongodb.net/student?retryWrites=true&w=majority";

mongoose.connect(mogoUrl, {useNewUrlParser:true})
mongoose.connection.on('error', err => {
    console.error('MongoDB error', err)
  })
app.use(express.json())
app.get('/all', async (req, res) => {
    const student = await Student.find({}).sort({sid:1})
    console.log(student.attdance);
    res.json(student)
})
app.get('/eligible', async (req, res) => {
  const student = await Student.find({})
  const eligibleStudent = []
  var x =0
  student.forEach(element => {
    var count =0
    element.attdance.forEach(absent =>{
      if(absent.status == "Absent"){
        count++
      }
    })
    if(count==3){
      eligibleStudent[x] = element
      x++
    }
  });
  res.json(eligibleStudent)
})
app.get('/section/:sec', async (req, res) => {
  const {sec} = req.params
  const student = await Student.find({section: sec}).sort({sid:1})
  console.log(student.attdance);
  res.json(student)
})
app.get('/attendance/:sid', async(req, res)=>{
  const {sid} = req.params
  const attendance = await Student.findOne({sid: sid}, {attdance:1, _id:0})
  res.json(attendance)
})
app.post('/check/:sid', async (req, res) => {
    const {sid} = req.params
    const payload = req.body
    console.log(payload.date)
    // const attendance = new Attendance(payload)
    try {
      const student = await Student.findOneAndUpdate({sid: sid}, 
        {$push:{attdance: {
            date: new Date(),
            week: payload.week,
            status: payload.status
        }}})
      await student.save()
    res.json(student)
      res.status(201).end()
    } catch (error) {
      res.status(400).json(error)
    }
})
app.post('/addStudent', async(req, res)=>{
  const payload = req.body
  console.log(payload.attdance);
  try{
  const student = new Student(payload)
  await student.save()
  res.status(201).end()
  }catch(error){
    res.status(400).json(error)
  }
})
module.exports = app