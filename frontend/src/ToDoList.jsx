import { useState, useEffect } from 'react'
import './ToDoList.css'
import { useNavigate } from 'react-router-dom';
import ToDo from './components/ToDo'
import { getAllToDO,addToDO,updateToDo,deleteToDo,uploadImage} from './utils/HandleApi'
import { useLocation } from 'react-router-dom';

function ToDoList() {          
  const [todo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isuploadImage, setImage] = useState(false)
  const [toDoId, setToDoId] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const location = useLocation();
  const email = location.state ? location.state.email : null;


  useEffect(() => {
    getAllToDO(email, setToDo);
  }, [email]);
  
  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  };

  const handleImageChange = (item_id,file) => {
    console.log("hello meghal----------------------------------")
    console.log("file---", file, "item_id",item_id)

    uploadImage(file,item_id,email,setToDo).then((response) => {
      if (response.status === 200) {
        console.log("response handleImageChange",response)
        setImage(true)
        setImageUrl(response.data.imageUrl);
        // item.image=imageUrl
      } else {
        console.error("Error uploading image:", response);
      }
    });
  };

  return (
    <div>
        <div className='App'></div>
        <div className='container'></div>
        <h1>ToDo App </h1>
        <div className='Top'>  
            <input type='text' placeholder='Add ToDo....' value={text} onChange={(e) => setText(e.target.value)}/>
        
            {/* <div className='Add' onClick={() => addToDO(text, email, setText, setToDo)} >ADD</div>  */}
            <div className='Add' 
                onClick={isUpdating ? 
                () => updateToDo(toDoId, text,email,setToDo, setText, setIsUpdating) 
                : () => addToDO(text, email, setText, setToDo)}>  
                {isUpdating ? "Update" : "Add"}
            </div> 
        </div> 
        
        <div className='List'>
          { 
            todo.map((item) => (
              <ToDo 
                key={item._id} 
                imageUrl={item.image}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id, email, setToDo)}   
                handleImage={(file) => handleImageChange(item._id,file)}
              />
            ))
          }
        </div>    
      </div>
    )
}
          
export default ToDoList

/* <div className='List'>
            { 
            todo.map((item)=> <ToDo 
            key={item._id} 
            imageUrl={item.image} //this the the image url and this could be null also if this is null then ToDo.jsx should show alternative image
            text={item.text}
            updateMode={()=> updateMode(item._id,item.text)}
            deleteToDo={()=> deleteToDo(item._id,email,setToDo)}  
            handleImage={(file) => handleImageChange(file, item._id)} 
            handleImage={(file) => handleImageChange(file,item.id)}
            />)}
        </div> */




// imageUpload={() => ( <input type="file" id="imageInput" accept="image/*" onChange={(e) => handleImageChange(e, item)} /> )}
// imageUpload={ <input type="file" id="imageInput" accept="image/*" onChange={(e) => handleImageChange(e, item)}/> }
// imageUpload={() => handleImageChange()}
{/* when comes to imageUpload then a input file for selecting a image should be there and when the image is selected then it should go to handleImageChange which save the file in backend get the url of that image and that image url is set as item.image*/}      
{/* // imageUpload={() => (<input type="file" onChange={(e) => handleImageChange(e, item._id)} /> )}          */}

// const handleImageChange = (e, _id) => {
//   const file = e.target.files[0];
//   uploadImage(file, _id).then((response) => {
//     if (response.status === 200) {
//       setImageUrl(response.data.imageUrl);
//     } else {
//       console.error("Error uploading image:", response);
//     }
//   });
// };

// const updateToDo= async (_id,text,email,setToDo, setText, setIsUpdating)=>{
//   const deleteToDo= async (_id, email,setToDo)=>{

// onClick={()=>addToDO(text,email,setText,setToDo)}



/* <div className='Add' 
                onClick={isUpdating ? 
                () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) 
                : () => addToDO(text, email,setText, setToDo)}>  
                {isUpdating ? "Update" : "Add"}
            </div>  
        
            <div className='List'>
            {todo.map((item) => (<ToDo 
            key={item._id} 
            text={item.text} 
            updateMode={()=> updateMode(item._id,item.text)}
            deleteToDo={()=> deleteToDo(item._id,setToDo)}/>))} */


// getAllToDO = async (email,setToDo)
// addToDO= async (text,email,setText,setToDo)
// updateToDo= async (_id,text,setToDo, setText, setIsUpdating)
// deleteToDo= async (_id, setToDo)







    // <div>
    //   <div className='App'></div>
    //   <div className='container'></div>
    //   <h1>ToDo App </h1>
    //   <div className='Top'>
    //     <input type='text' placeholder='Add ToDo....' value={text} onChange={(e) => setText(e.target.value)}/>
        
    //       <div className='Add' 
    //         onClick={isUpdating ? 
    //           () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) 
    //         : () => addToDO(text, setText, setToDo)}>
    //         {isUpdating ? "Update" : "Add"}
    //       </div>  
        
    //     <div className='List'>
    //       {todo.map((item) => (<ToDo 
    //       key={item._id} 
    //       text={item.text} 
    //       updateMode={()=> updateMode(item._id,item.text)}
    //       deleteToDo={()=> deleteToDo(item._id,setToDo)}/>))}


    //     </div>

    //   </div>
    // </div>