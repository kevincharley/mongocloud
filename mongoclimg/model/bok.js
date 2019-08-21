var mongoose=require('mongoose')
var bschema=mongoose.Schema;
var bookschema=new bschema({
    title:String,
  covimg:String, 
    
   
})
var bookmodel=mongoose.model("book",bookschema,"bookss");
module.exports=bookmodel