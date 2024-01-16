import axios from 'axios'

// const baseUrl = "http://localhost:5001";
const baseUrl = "https://todolist-app-with-auth.onrender.com";

const signUpUser= async (name, email, password)=>{
    try {
        const response = await axios.post(`${baseUrl}/signup`,{name:name,email: email, password:password});
        console.log("data signUpUser HandleApi-- ", response);
        return response;
    } catch (error) {
        console.log("error signUpUser-- ", err.response);
        return err;
    }
}

const loginUser= async (email, password)=>{
    try {
        const response = await axios.post(`${baseUrl}/login`,{email: email, password:password});
        console.log("data loginUser HandleApi-- ", response);
        return response;
    } catch (error) {
        console.log("error loginUser-- ", err.response);
        return err;
    }
}

const getAllToDO = async (email, setToDo) => {
    try {
      console.log("email handleApi", email);
      const response = await axios.get(`${baseUrl}/`, { params: { email } });
      console.log("data getall todo HandleApi-- ", response);
      setToDo(response.data);
      // return response;
    } catch (error) {
      console.log("error getAllToDo HandleApi-- ", error);
      return error;
    }
  };
  

const deleteToDo= async (_id, email,setToDo)=>{
    try {
        const response = await axios.delete(`${baseUrl}/delete`,{ data:{_id: _id}});
        console.log("data deleteToDo HandleApi-- ", response);
        if (response.status === 200) {
            await getAllToDO(email, setToDo);
        }
        // window.location.reload()
        return response;
    } catch (error) {
        console.log("error deleteToDo-- ", error.response);
        return error;
    }
}

const addToDO= async (text,email,setText,setToDo)=>{
    try {
        const response = await axios.post(`${baseUrl}/save`,{text:text,email: email});
        console.log("text handleApi ",text,"email",email)
        // const response = await axios.get(`${baseUrl}/save`, { params: { text, email } });
        console.log("data addToDo HandleApi-- ", response);
        setText("")
        getAllToDO(email,setToDo)
        // return response;
    } catch (error) {
        console.log("error addToDO HandleApi-- ", error.response);
        return error;
    }
}


const updateToDo= async (_id,text,email,setToDo, setText, setIsUpdating)=>{
    try {
        const response = await axios.put(`${baseUrl}/update`,{_id:_id, text,});
        console.log("data updateToDo HandleApi-- ", response);
        setText("")
        setIsUpdating(false)
        getAllToDO(email,setToDo)
        return response;
    } catch (error) {
        console.log("error updateToDo-- ", err.response);
        return err;
    }
}

const uploadImage = async (file, _id,email, setToDo) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("_id", _id);
  
      const response = await axios.post(`${baseUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("data uploadImage HandleApi-- ", response);
      getAllToDO(email, setToDo)
      return response
    //   if (response.status === 200) {
    //     return response.data.imageUrl;
    //   }
    //   return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

export{signUpUser,loginUser,getAllToDO,addToDO,updateToDo,deleteToDo,uploadImage}

