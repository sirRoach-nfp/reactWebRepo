

import axios from 'axios';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

import '../components/componentStyles/PRC.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userContext } from '../MainPage';
import swal from 'sweetalert';
import { useContext,useEffect } from 'react';




export default function PostRecipeComponent(){

    const {userName} = useContext(userContext);
    const schema = yup.object().shape({
        recipetitle: yup.string().required(),
        recipedescription:  yup.string().required(),
        recipebody:  yup.string().required(),
        recipephoto: yup.mixed().required()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        //resolver: yupResolver()
        
    });
    const postRecipeOnSubmit = async (data) =>{

        console.log(errors); 
        const formData = new FormData();
        formData.append('recipetitle', data.recipeTitle);
        formData.append('recipedescription', data.recipeDescription);
        formData.append('recipebody', data.recipeBody);
        formData.append('recipephoto', data.recipeCover[0]);
        formData.append('recipeprep', data.recipePreptime);
        formData.append('recipestep', data.recipeStep);
        formData.append('author', userName)


        try{
            const response = await axios.post("http://localhost:5000/api/recipe/upload",formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                swal({
                    title: "Done!",
                    text: "Your Recipe is posted!",
                    icon: "success",
                    timer: 3000,
                    button: false
                });
            }

            console.log(response)
        } catch(err){
            console.log(err)
        }






    }

    const testsubmit = (event) => {
        event.preventDefault()
        console.log("test")
    }


    useEffect(() => {
        console.log(userName);
    },[])


    return(
        <div className="PRCmain">

            <form action="" className='recipeForm' onSubmit={
                handleSubmit(postRecipeOnSubmit)
            }>
                <div className='postRecipeHeaderDiv'><h3 className='recipeFormHeader'>Share Your Recipe</h3></div>
                
                <TextField id="outlined-basic" label="Recipe Title" variant="outlined" 
                style={{ width: '80%',margin: '10px' }}
                {...register('recipeTitle')}

                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Recipe description"
                    multiline
                    maxRows={10}
                    style={{width: '80%',margin: '10px'}}
                    {...register('recipeDescription')}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Ingredients"
                   
                    multiline
                    maxRows={10}
                    style={{width: '80%',margin: '10px'}}
                    {...register('recipeBody')}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="How to make"
                    multiline
                    maxRows={10}
                    style={{width: '80%',margin: '10px'}}
                    {...register('recipeStep')}
                />
                <TextField
                    id="outlined-number"
                    label="Prep Time (Minutes)"
                   
                    type="number"
                    style={{width: '80%',margin: '10px'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1
                    }}
                    {...register('recipePreptime')}
                />
                <label className='labelInput'>Recipe Snapshot</label>
                <input className='custom-file-input' type="file" accept=".jpg,.png"
                {...register('recipeCover')}
                />   
                <input type='submit' className='submitButton' value="Post Recipe"/>

            </form>

        </div>
    )
}
