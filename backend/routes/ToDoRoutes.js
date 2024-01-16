// ToDoRoutes.js
const { Router } = require('express');
const { getToDoOfUser, saveToDoOfUser, updateToDoOfUser, deleteToDoOfUser, loginUser, signupUser, deleteAll } = require("../controllers/ToDoControllers");

//==========================================================================================
const multer = require('multer');
const path = require("path");
const {ToDoModel, userModel }=require("../modules/ToDoModules");


// Add the following Firebase imports
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const uploadToFirebase = async (file, fileName) => {
  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, file.buffer);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });
//==========================================================================
module.exports = (app) => {
  const router = Router();

  router.route("/").get(getToDoOfUser);
  router.route("/save").post(saveToDoOfUser);
  router.route("/update").put(updateToDoOfUser);
  router.route("/delete").delete(deleteToDoOfUser);
  router.route("/deleteAll").get(deleteAll);

  router.route("/login").post(loginUser);
  router.route("/signup").post(signupUser);

  //======================================================================
  router.post("/upload/", upload.single("image"), async (req, res) => {
    try {
      const originalFileName = req.file.originalname;
      const fileExtension = path.extname(originalFileName);
      const timestamp = Date.now();
      const fileName = `${path.parse(originalFileName).name}_${timestamp}${fileExtension}`;

      const imageUrl = await uploadToFirebase(req.file, fileName);

      if (imageUrl) {
        const {_id} = req.body;
        await ToDoModel.findByIdAndUpdate(_id, { image:imageUrl });
        res.status(200).json({ message: "Image has been uploaded to Firebase successfully", imageUrl });
      } else {
        res.status(500).json("Error getting image URL from Firebase");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Error uploading image to Firebase");
    }
  });

  return router;
  
};

// ===============================================














// const {Router}=require('express')
// const {getToDoOfUser,saveToDoOfUser,updateToDoOfUser,deleteToDoOfUser,loginUser,signupUser,deleteAll}=require("../controllers/ToDoControllers");

// const router=Router();

// router.route("/").get(getToDoOfUser);
// router.route("/save").post(saveToDoOfUser);
// router.route("/update").put(updateToDoOfUser);
// router.route("/delete").delete(deleteToDoOfUser);
// router.route("/deleteAll").get(deleteAll);

// router.route("/login").post(loginUser);
// router.route("/signup").post(signupUser);

// // router.route("/upload").post(upload.single('image'),uploadImage);

// const multer=require('multer')
// const path = require("path");
// // Add the following Firebase imports
// const { initializeApp } = require("firebase/app");
// const { getStorage, ref, uploadBytes ,getDownloadURL } = require("firebase/storage");

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID,

// };

// const firebaseApp = initializeApp(firebaseConfig);
// const storage = getStorage(firebaseApp);

// const uploadToFirebase = async (file, fileName) => {
//     const storageRef = ref(storage, `images/${fileName}`);
//     await uploadBytes(storageRef, file.buffer);
//     const downloadURL = await getDownloadURL(storageRef);
//     return downloadURL;
//   };
  
  
//   // Setting up multer as a middleware to grab photo uploads
//   const upload = multer({ storage: multer.memoryStorage() });

//   app.post("/upload", upload.single("image"), async (req, res) => {
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


// module.exports=router