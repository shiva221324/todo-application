const express=require('express')
const router=express.Router()
const Todo=require("../models/Todo")

//create
router.post('/',async(req,res)=>{
    const todoData=req.body
    const todo=new Todo(todoData)
    await todo.save()
    res.json({
        success:true,
        todo
    })
})

//get
router.get('/',async(req,res)=>{
    const todos=await Todo.find()
    res.json({
        success:true,
        todos
    })
})

//update
router.put('/:id',async(req,res)=>{
    const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
      res.json({
        success:true,
        todo
    })
})

//delete
router.delete('/:id',async(req,res)=>{
    await Todo.findByIdAndDelete(req.params.id)
    res.json({
        success:true,
        message:"Deleted successfully"
    })
})

module.exports=router