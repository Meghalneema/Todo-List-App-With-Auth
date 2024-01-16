const mongoose=require("mongoose");

const ToDoSchema=new mongoose.Schema({
    text:{
        type:String,
        require:true,
    },
    email:{
      type: String,
      required: true,
    },
    image:{
      type:String,
      required:false,
      default:null,
    }
});

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }  
  });


const ToDoModel = mongoose.model("ToDo", ToDoSchema);
const userModel = mongoose.model("user", userSchema);
  
module.exports = { ToDoModel, userModel };  

// module.exports=mongoose.model("ToDo",ToDoSchema, "SignUp",SignUpSchema, "Login",LogInSchema);