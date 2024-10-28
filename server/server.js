let express=require('express');
let mongoose=require('mongoose');
let cors=require('cors');
let Workmodel=require('./models/datasmodel.js');
let app=express();

//middlewares
app.use(cors());
app.use(express.json());

let PORT=4000;
mongoose.connect('mongodb+srv://prasannampmrasanna:vJQW5HYh2ypgUer8@todo2.hctzp.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Todo2')
.then(()=>{
  console.log('Database connected!');
  app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)
  })
})
.catch((error)=>{console.log(error)});

//requests:-
app.post('/',async (req,res)=>{
    try{
      let work=await Workmodel.create(req.body);
      let dbdatas=await Workmodel.find({});
      res.status(200).json(dbdatas);
      console.log(work);
    }
    catch(error){
      res.status(500).json({"message":error});
    }
})

app.get('/',async (req,res)=>{
  try{
    let dbdatas=await Workmodel.find({});
    res.status(200).json(dbdatas);
  }
  catch(error){
    res.status(500).json({"message":error});
  }
})

app.delete('/',async (req,res)=>{
  try{
    let {id}=req.body;
    await Workmodel.deleteOne({_id:id})
    res.status(200).json({message:"One element Deleted successfully"})
  }
  catch(error){
    res.status(500).json({message:error})  
  }
})

app.delete('/cdelete',async (req,res)=>{
    try{
        let {message}=req.body;
      if(message!=="Delete all the lists")
      {
        res.status(500).json({message:"Something went wrong!"})
      }
      await Workmodel.deleteMany({})
      res.status(200).json({message:"Deleted successfully"});
    }
    catch(error){
      res.status(500).json({message:error})
    }
})