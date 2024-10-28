let mongoose=require('mongoose');

let Worksschema=new mongoose.Schema({
    work:{type:String,required:true}
});

let Workmodel=mongoose.model("Workdata",Worksschema);

module.exports=Workmodel;