//setup to require express
const express =require('express')
const app = express()

//setup to be able to use mongoose
const mongoose = require('mongoose')

//accept json file
app.use(express.json())

//retrieve the location for the home localhost and display message
app.get('/',(req,res) =>{
    res.send({message:"Welcome to DressStore application"})
})

//connect the mongoose to the database
mongoose.connect('mongodb://localhost/Marketplace',{useNewUrlParser: true})

//show message if successful connection with db
const db = mongoose.connection

db.once('open',() => console.log("Success connected to db"))

const prodRoutes = require('./route/router')
app.use('/products',prodRoutes)

//listen the port and open it, if success display message below
app.listen(3000, () => console.log("server is running"))