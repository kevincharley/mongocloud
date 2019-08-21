var express=require('express')
var mong=require('mongoose')
var app=express();
var multer=require('multer')
var url="mongodb://localhost/mybookdb";
mong.connect(url,function(err){
    if(err) throw err
   else{
        console.log("db connected")
    }
})
var model=require('./model/bok')
var path=require('path')
app.set("view engine","ejs")
app.set("views","./src/view")
var storage=multer.diskStorage({destination:function(req,file,cb){
    cb(null,path.join(__dirname,"/./uploads"))
},
filename:function(req,file,cb){
    cb(null,"img"+req.body.tt+".jpg")
}
})
var up=multer({storage:storage})
var bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.get("/",function(req,res){
res.render('home')})

app.get("/view/:image",function(req,res){
    res.sendFile(__dirname+'/images/'+req.params.image)})

app.listen(4000,function(req,res){
    console.log("started")
})
app.get("/new",function(req,res){
    res.render('newbook')})

    app.post("/add",up.single('file1'),function(req,res){
        var b1=new model()
        b1.title=req.body.tt
        b1.covimg="img"+req.body.tt+".jpg"
        b1.save(function(err){
            if(err) throw err
            else{
                res.send("data added")
            }
        })
    })
  app.get("/view",function(req,res){
      model.find({},function(err,result){
          if(err) throw err

          else{
              console.log(result)
          res.render('viewbooks',{arr:result})
        }
      })
  })
  app.get("/viewbk/:imgid",function(req,res){
      res.sendFile(__dirname+'/uploads/'+req.params.imgid)
  })