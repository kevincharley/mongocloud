var express=require('express')
var mongoose=require('mongoose')
var app=express();
var url="mongodb+srv://kevincharley:qwertyuiop@cluster0-k3xut.mongodb.net/test?retryWrites=true&w=majority/mydbfb";
mongoose.connect(url,function(err){
    if(err) throw err
    else{
        console.log("db connected")
    }
})
app.set("view engine","ejs")
app.set("views","./src/view")
var bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.render('home')})
   
app.listen(3000,function(req,res){
    console.log("started")
})
var emp=require('./model/empl')
app.post("/add",function(req,res){
    var e1=new emp()
    e1.eid=req.body.eidn;
    e1.name=req.body.empn;
    e1.salary=req.body.sal;
    e1.save(function(err){
        if(err) throw err
     else{
         res.send("data added")

     }
    })


})