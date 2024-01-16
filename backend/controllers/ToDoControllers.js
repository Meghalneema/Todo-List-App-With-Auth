const {ToDoModel, userModel }=require("../modules/ToDoModules");
const uuid = require('uuid');
// ===========================================================
// const admin = require("firebase-admin");
// const { serviceAccountPath, storageBucket } = require("../config");

// const serviceAccount = require(serviceAccountPath);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: storageBucket,
// });

// const bucket = admin.storage().bucket();

// const uploadImage = async (req, res) => {               
//     try {
//         res.send("uploadImage");
//     } catch (error) {
//         console.log('Error while getting connection with firebase or upload image and get image', error);
//         res.status(500).send('Internal server Error occured while getTodo');
//     }
// };

// =================================================

const getToDoOfUser = async (req, res) => {               
    try {
        const { email } = req.query;
        console.log("email getTo controller",email)
        const todos = await ToDoModel.find({ email }); 
        // console.log("todocontroller getToDo",todos);
        console.log("todos get todo", todos)
        res.send(todos);
    } catch (error) {
        console.log('Error while finding user and its todo list:', error);
        res.status(500).send('Internal server Error occured while getTodo');
    }
};

const saveToDoOfUser = async (req, res) => {               
    try {
        const {text,email} = req.body;
        console.log("text controller ",text,"email",email)
        const newToDo = new ToDoModel({
            text,
            email,
        });
        await newToDo.save(); 
        console.log(newToDo);
        res.send('Added successfully');
    } catch (error) {
        console.log('Error while finding user and adding its data:', error);
        res.status(500).send('Internal server Error occured while adding');
    }
};

const updateToDoOfUser = async (req, res) => {               
    try {
        const {_id,text} = req.body;
        console.log("updateToDoOfUser id controller ",_id,"text",text)
        await ToDoModel.findByIdAndUpdate(_id, { text });
        res.send('updated successfully');
    } catch (error) {
        console.log('Error while updating user todo:', error);
        res.status(500).send('Internal server Error occured while updating todo');
    }
};

const deleteToDoOfUser = async (req, res) => {               
    try {
        const {_id} = req.body;
        console.log("deleteToDoOfUser id controller ",_id)
        await ToDoModel.findByIdAndDelete(_id);
        res.send('deleted successfully');
    } catch (error) {
        console.log('Error while deleting user todo:', error);
        res.status(500).send('Internal server Error occured while deleting todo');
    }
};

const loginUser = async (req, res) => {               
    try {
        const {email, password } = req.body;
        const existingUser = await userModel.findOne({ email });    // Check if the email already exists
        if (!existingUser) {
            return res.status(210).send('Email does not exist');
        } else if (!(existingUser.email === email && existingUser.password === password)) {
            return res.status(220).send('Password is wrong');
        }
        res.status(200).send('Login was successful');
    } catch (error) {
        console.log('Error while finding user:', error);
        res.status(500).send('Internal server Error occured while login');
    }
};

const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });    // Check if the email already exists
        if (existingUser) {
            console.log('400 Email already exists');
            return res.status(210).send('Email already exists');
        }
        const newUser = new userModel({
            name,
            email,
            password,
        });
        await newUser.save();
        console.log('200 Signup was successful');
        res.status(200).send('Signup was successful');
    } catch (error) {
        console.log('Error creating user in backend:', error);
        res.status(500).send('Internal server Error occured while signup');
    }
};

const deleteAll = async (req, res) => {               
    try {
        await ToDoModel.deleteMany();
        res.send('Deleted all data successfully');
    } catch (error) {
        console.log('Error while deleting:', error);
        res.status(500).send('Internal server error occurred while deleting todos');
    }
};


module.exports={getToDoOfUser,saveToDoOfUser,updateToDoOfUser,deleteToDoOfUser,loginUser,signupUser,deleteAll}





// app.post("/upload", upload.single("image"), async (req, res) => {
//     try {
//       const originalFileName = req.file.originalname;
//       const fileExtension = path.extname(originalFileName);
//       const timestamp = Date.now();
//       const fileName = `${path.parse(originalFileName).name}_${timestamp}.png`;
  
//       const imageUrl = await uploadToFirebase(req.file, fileName);
  
//       if (imageUrl) {
//         res.status(200).json({ message: "Image has been uploaded to Firebase successfully", imageUrl });
//       } else {
//         res.status(500).json("Error getting image URL from Firebase");
//       }
//       // res.send("imageUrl of firebase ",imageUrl)
//     } catch (error) {
//       console.error(error);
//       res.status(500).json("Error uploading image to Firebase");
//     }
//   });
