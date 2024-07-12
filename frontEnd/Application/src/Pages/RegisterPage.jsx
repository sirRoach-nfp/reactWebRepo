
import { Link,  useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useContext, useState} from 'react'
import axios from "axios"
import swal from 'sweetalert';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

import './pagesStyle/RegisterPage.css'

export default function RegisterPage(){


    const portURL = "https://recipewebsitebackend.onrender.com";

    const navigate = useNavigate();
    


    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
    })


    const{register,handleSubmit,formState: {errors}} = useForm({
       resolver: yupResolver(schema)
    });


    const registerUser = async (data) => {

    
        console.log(errors);

        

        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        
        if (Object.values(errors).some(err => err !== undefined)) {
            swal({
                title: "Error!",
                text: "All fields are required",
                icon: "error",
                timer: 2000,
                button: false
            })
        }
        try{
            const res = await axios.post(`${portURL}/api/auth/register`,formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });

            swal({
                title: "Success!",
                text: "Account created",
                icon: "success",
                timer: 2000,
                button: false
              }).then(()=> {
                    navigate("/login");
              })

            console.log(res.data);
        }catch(err){
            console.log(err.response.data)
            if(err.response && err.response.data && err.response.data.message){
                swal({
                    title: "Error!",
                    text: "Email/Username already exists",
                    icon: "error",
                    timer: 2000,
                    button: false
                  })
            }
        }

    }


    return(

        <>
        
        <hr />
        <div className="registerPageMain" onSubmit={handleSubmit(registerUser)}>

            <form action="" className='registerFormContainer'>
                 <h1 className='registerHeader'>Signup</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" 
                style={{ width: '70%',margin: '10px' }}
                {...register('username')}
                sx={{
                    width: '70%',
                    margin: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputBase-input': {
                        color: 'white',
                    },
                }}
                
               
                />
                <TextField id="outlined-basic" label="Email" variant="outlined" 
                style={{ width: '70%',margin: '10px' }}
                {...register('email')}
                sx={{
                    width: '70%',
                    margin: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputBase-input': {
                        color: 'white',
                    },
                }}
                />
                <TextField id="outlined-basic" label="Password" variant="outlined" 
                style={{ width: '70%',margin: '10px',  }}
                {...register('password')}
                sx={{
                    width: '70%',
                    margin: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputBase-input': {
                        color: 'white',
                    },
                }}
                />
                <Button variant="contained"
                type="submit" 
              
                style={{ width: '50%', marginTop: '15px', marginBottom: '15px'}}
                >Contained</Button>
                <p>Already have an account? <Link to={"/Login"}>Login</Link></p>

            </form>
 
        </div>
        </>
    )
}