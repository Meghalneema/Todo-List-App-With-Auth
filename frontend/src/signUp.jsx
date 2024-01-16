import React, { useState, useEffect } from 'react';
// import { useState } from 'react'
import './signUp.css'
import { useNavigate } from 'react-router-dom';
import Login from './login.jsx'
import { signUpUser } from './utils/HandleApi'

import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';
import ToDoList from './ToDoList'

function SignUp() {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [message, setMessage] = useState('');
    
    const handleLoginClick = () => {
        navigate('/login'); 
    };
    const handleToDo = () => {
        navigate('/ToDoList',{ state: { email: value } }); 
    };

    const [value, setValue] = useState('');

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            //get the user email using Google auth for signup once you have the email go to handleToDo
            const userEmail = data.user.email;
                
          setValue(data.user.email);
          localStorage.setItem('email', data.user.email);
          handleToDo();
        });
    };

    useEffect(() => {
        setValue(localStorage.getItem('email'));
    }, []);


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            console.log("name: ", name, " email: ",email, " password: ",password);
            const response = await signUpUser(name, email, password);
            if(response.status==210){
                setMessage("Email already exists ");
                setIsSignedUp(false);
            }
            else if(response.status==500){
                setMessage("Internal server Error occured while signup");
                setIsSignedUp(false);
            }
            else if(response.status==200){
                setMessage("Signup was successful");
                setIsSignedUp(true);
                setname("")
                setemail("")
                setpassword("")
                // also make the text of name email password as blank
                handleLoginClick()
            }
            else{
                setMessage("some eoor occured");
                setIsSignedUp(false);
            }
        } catch (error) {
            console.error('Error in handleSignUp:', error);
            setMessage('Internal server error occurred');
        }
    };
    
    return (
      <div className="container">
          <div className="signUp-container">
              <h2>SignUp</h2>
          </div>
          <form id="signup-form">
              <input type="text" id="username" placeholder="Username" required onChange={(e) => setname(e.target.value)} />
              <input type="email" id="mail" placeholder="mail id" required onChange={(e) => setemail(e.target.value)}/>
              <input type="password" id="password" placeholder="Password" required onChange={(e) => setpassword(e.target.value)}/>
              <button type="submit" onClick={handleSignUp}>Sign Up</button>
              <button type="submit" onClick={handleLoginClick}>Login</button>
              <div><button onClick={handleClick}>sign up with google</button></div>
          </form>
          <div className="message-container">{message}</div>
      </div>
    );
  }

export default SignUp
// {/* <div>{value ? handleToDo() : <button onClick={handleClick}>sign in with google</button>}</div> */}
// {/* <div>{value ? ({handleToDo}) : (<button onClick={handleClick}>sign in with google</button>)}</div> */}

// {isSignedUp && <div className="message-container">{message}</div>}




// const handleClick = () => {
//     signInWithPopup(auth, provider).then((data) => {
//         //get the user email,name, password and check in my backend whether the email already exist or signup was successful then 
//         //navigate to login and pass the user email and password
//         const user = data.user;
//         const userEmail = user.email;
//         const userName = user.displayName;

//       setValue(data.user.email);
//       localStorage.setItem('email', data.user.email);
//     });
// };


// useEffect(() => {
//     setValue(localStorage.getItem('email'));
// }, []);


//  const [value, setValue] = useState(false);

//  <div><button onClick={handleClick}>sign in with google</button></div>