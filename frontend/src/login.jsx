import { useState , useEffect} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { loginUser } from './utils/HandleApi'
import { auth, provider } from './config';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleSignUpClick = () => {
    navigate('/signup'); 
  };
  const handleToDoClick = () => {
    navigate('/ToDoList', { state: { email: email } });
  };
  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          console.log("email: ",email, " password: ",password);
          const response = await loginUser(email, password);
          if(response.status==210){
              setMessage("Email does not exists ");
              setIsLoggedIn(false);
          }
          else if(response.status==220){
              setMessage("Password is wrong");
              setIsLoggedIn(false);
          }
          else if(response.status==500){
              setMessage("Internal server Error occured while login");
              setIsLoggedIn(false);
          }
          else if(response.status==200){
              setMessage("Login was successful");
              setIsLoggedIn(true);
              handleToDoClick()
          }
          else{
              setMessage("some eoor occured");
              setIsLoggedIn(false);
          }
      } catch (error) {
          console.error('Error in handleSignUp:', error);
          setMessage('Internal server error occurred');
      }
  };

    const [value, setValue] = useState('');
    const handleToDo = () => {
        navigate('/ToDoList',{ state: { email: value } }); 
    };
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            
          const userEmail = data.user.email;    
          setValue(data.user.email);
          localStorage.setItem('email', data.user.email);
          handleToDo();
        });
    };

    useEffect(() => {
        setValue(localStorage.getItem('email'));
    }, []);

    return (
    <div className="container">
            <div className="login-container">
                <h2>Login</h2>
            </div>
            <form id="login-form">
                <input type="email" id="mail" placeholder="mail id" required onChange={(e) => setemail(e.target.value)}/>
                <input type="password" id="password" placeholder="Password" required onChange={(e) => setpassword(e.target.value)}/>
                <button type="submit" onClick={handleLogin}>Login</button>
                <button type="submit" onClick={handleSignUpClick}>SignUp</button>
                <div><button onClick={handleClick}>sign in with google</button></div>

            </form>
            <div className="message-container">{message}</div>
    </div>
  )
}

export default Login



// const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };