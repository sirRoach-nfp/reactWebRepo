import { useParams,useNavigate } from "react-router-dom";
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
import { useContext,useEffect, useState } from 'react';
import './pagesStyle/EditPage.css'
import CircularProgress from '@mui/material/CircularProgress';



export default function EditPage(){

    const portURL = "https://recipewebsitebackend.onrender.com";

    //load

    const[loadContent,setLoadingContent] = useState(true);

    const {recipeId} = useParams();
    const {accountId} = useContext(userContext);


    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm({
        //resolver: yupResolver()
    });

    const [recipe,setRecipe] = useState([])



    useEffect(() => {

        const fetchRecipe = async() => {
            try{
                const res = await axios.get(`${portURL}/api/recipe/viewrecipe/${recipeId}`);
                console.log(res.data);
                setRecipe(res.data)
                setValue('recipeTitle', res.data.recipetitle);
                setValue('recipeDescription', res.data.recipedescription);
                setValue('recipeBody', res.data.recipebody);
                setValue('recipeStep', res.data.recipestep);
                setValue('recipePreptime', res.data.preptime);
            }catch(err){}
            finally{
                setLoadingContent(false);
            }
        }

        fetchRecipe();

    },[recipeId])


    const update = async(data) => {

        console.log(errors);
        const formData = new FormData();
        formData.append('recipetitle', data.recipeTitle);
        formData.append('recipedescription', data.recipeDescription);
        formData.append('recipebody', data.recipeBody);
        formData.append('recipephoto', data.recipeCover[0]);
        formData.append('recipeprep', data.recipePreptime);
        formData.append('recipestep', data.recipeStep);
        formData.append('author', recipe.author)

        try{
            const res = await axios.put(`${portURL}/api/recipe/update/${recipeId}`,formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            swal("Success!", "Recipe updated successfully", "success").then(() => {
                navigate(`/account/${accountId}`);
            });
           
        }
        catch(err){console.log(err)}

    }




    const deleteRecipe = async()=>{

        try{
            const res = await axios.delete(`${portURL}/api/recipe/delete/${recipeId}`);
            swal("Success!", "Recipe Deleted successfully", "success").then(() => {
                navigate(`/account/${accountId}`);
            })
        }catch(err){console.log(err)}
    }

    const ingredient = recipe.recipebody ? recipe.recipebody.split('\n'):[];

    return(

        <div> 
            {loadContent ? (<div  className='loaderBody'> <CircularProgress size={80}/> </div>) : (
                 <div className="editpagemain">
                 <div className="editHeaderDiv"><h3 className="editheader">Edit your recipe</h3></div>
                 <form action="" className="formDivEdit" onSubmit={handleSubmit(update)}>
                     <TextField id="outlined-basic" label="" variant="outlined" 
                         style={{ width: '90%',margin: '10px' }}
                         {...register('recipeTitle')}
                         defaultValue={recipe.recipetitle}
                         />
                     <TextField
                         id="outlined-multiline-flexible"
                         label=""
                         multiline
                         maxRows={10}
                         style={{width: '90%',margin: '10px'}}
                         {...register('recipeDescription')}
                         defaultValue={recipe.recipedescription}
                    
                     />
                     <TextField
                         id="outlined-multiline-flexible"
                         label=""
                        
                         multiline
                         maxRows={10}
                         style={{width: '90%',margin: '10px'}}
                         {...register('recipeBody')}
                         defaultValue={recipe.recipebody}
                     />
                     <TextField
                         id="outlined-multiline-flexible"
                         label=""
                         multiline
                         maxRows={10}
                         style={{width: '90%',margin: '10px'}}
                         {...register('recipeStep')}
                         defaultValue={recipe.recipestep}
                     />
                     <TextField
                         id="outlined-number"
                         label=""
                        
                         type="number"
                         style={{width: '90%',margin: '10px'}}
                         InputLabelProps={{
                             shrink: true,
                         }}
                         inputProps={{
                             min: 1
                         }}
                         {...register('recipePreptime')}
                         defaultValue={recipe.preptime}
                     />
     
                     <div className="fileUploadDiv"><label className='labelInput'>Recipe Snapshot</label>
                     <input className='custom-file-input' type="file" accept=".jpg,.png"
                     {...register('recipeCover')}
                     />   </div>
     
                     <div className="editButtonDiv">
                         <input type="submit" value={"Save Update"}  className="saveEditButton"/>
                         <button className="deleteRecipeButton" onClick={deleteRecipe}> Delete</button>
                     </div>
                     
                     
                 </form>
             </div>
            )}

        </div>
       
    )
}