import React from 'react';
import { useState,useRef } from 'react'
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillPicture } from 'react-icons/ai';
import { AiOutlineUpload } from 'react-icons/ai';

const ToDo = ({text,updateMode,deleteToDo,handleImage,imageUrl}) =>{ 
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        handleImage(e.target.files[0]);
    };
    const showFileInput = () => {
        fileInputRef.current.click();
      };
    return(
        <div className="toDo"> 
            <div> {imageUrl ? ( <img src={imageUrl} alt="" className='imageClass'/> ) : ( <AiFillPicture className="icon" /> )} </div>
            <div className="text">{text}</div>
            <div className="icons">
                <BiEdit className="icon"  onClick={updateMode}/>
                <AiFillDelete className="icon" onClick={deleteToDo}/>
                <AiOutlineUpload className="icon" onClick={showFileInput} />
                <input ref={fileInputRef} type="file" id="imageInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
        </div>
    )
}

export default ToDo;
{/* <AiOutlineUpload className="icon" onClick={handleFileChange} /> */}
 /* <label className="icon" htmlFor="imageInput">
                    <AiOutlineUpload />
                    <input type="file" id="imageInput" accept="image/*" style={{ display: 'none' }} onClick={handleImage} />
                </label> */

/* <div className="icons">
    <label htmlFor="image-upload" className="icon">
        <AiOutlineUpload />
    </label>
    <input
        type="file"
        id="image-upload"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => uploadImage(e.target.files[0])}
    />
</div> */