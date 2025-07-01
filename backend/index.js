const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const todoRoute=require('./routes/todos')
const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/todos',todoRoute)

mongoose
.connect('mongodb+srv://sivavenkatkumar34:vtJOkzYT1YKSLwj9@cluster0.3yz92nx.mongodb.net/')
.then(()=>console.log("db connected"))
app.listen(8080,()=>{
    console.log("server is running")
})