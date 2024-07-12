import Box from '@mui/material/Box';
import { Link,  useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useContext, useState} from 'react'
import axios from 'axios'
import './LoginPage.css'
import { userContext } from './MainPage';

function LoginPage(){

    const {accountId,setAccountId,isLogged,setLogged,setUser} = useContext(userContext)

    const navigate = useNavigate();
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [error,seterror] = useState("");

    const userHandler = (event) => {
        setUserName(event.target.value);
    }


    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }


    const loginHandler = async () =>{
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login",{
                username,
                password
            });
            console.log(res.data)
            console.log(res.data.others._id)
            setAccountId(res.data.others._id);
            setLogged(true);
            setUser(res.data.others.username);
            navigate(`/account/${res.data.others._id}`)
           
          
        } catch(err){
            console.log(err)
            seterror("Invalid username or password. Please try again.");
        }
    }
   
    return(
        <>
        <hr />
        <div className='loginpagemaincont'>
       
            <div className="Loginpagemain">
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }} >{error}</p>}
                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={userHandler} 
                style={{ width: '90%',margin: '10px' }}
        
                />
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={passwordHandler} 
                style={{ width: '90%',margin: '10px' }}
                
                />
                <p>forgot your password?</p>
                <Button variant="contained" onClick={loginHandler}
                    style={{ width: '90%', marginTop: '15px', marginBottom: '15px', backgroundColor: '#84aa35'}}
                >Contained</Button>
                <p>Don't have an account? <Link to={"/Register"}>signup</Link></p>
            </div>
        </div>
        </>
        
    )
}
export default LoginPage;