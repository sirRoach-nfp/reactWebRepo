import { useParams } from 'react-router-dom'
import axios from 'axios';
import {useState,useEffect} from 'react'
import { Buffer } from 'buffer';
import CircularProgress from '@mui/material/CircularProgress';
import './pagesStyle/RecipePage.css'
import SuggestedCards from '../components/SuggestedCards';

export default function RecipePage(){

    const portURL = "https://recipewebsitebackend.onrender.com";
    
    const {recipeId} = useParams()
    const [recipe,setRecipe] = useState([]);
    const [suggested,setSuggested] = useState([])
    const [base64,setBase64] = useState("")

    //loadState 
    const[loadingContent,setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchRecipe = async () =>{
            try{
                const res = await axios.get(`${portURL}/api/recipe/viewrecipe/${recipeId}`)
                const suggestedRes = await axios.get(`${portURL}/api/recipe/suggested`);
                setSuggested(suggestedRes.data);
                //console.log(suggestedRes.data)
                setRecipe(res.data);
                console.log(res.data.recipephoto)
                const base64String = Buffer.from(res.data.recipephoto.data).toString('base64');
                setBase64(`data:image/jpeg;base64,${base64String}`)

            } catch(err){   
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }

        fetchRecipe();
    },[recipeId])


    //const base64Image = `data:image/jpeg;base64,${recipe.recipephoto}`;

    
    const ingredients = recipe.recipebody ? recipe.recipebody.split('\n') : [];
    return(
        <div>
        <hr />
        {loadingContent ? ( <div className='loaderBody'>  <CircularProgress size={80}/> </div>) :(<div className="recipePageBody">
            
            <div className='infoDiv'>
                <h3 className='recipetitle'>{recipe.recipetitle}</h3>
                <p className='infotag' id='preptime'>{recipe.preptime} minutes</p>
                <p className='infotag' id='authortag'>By:{recipe.author}</p>
            </div>
            <div className='imageDiv'>
                <img src={base64} alt="" className='recipeImage'/>
            </div>
            <div className='recipeDescriptionDiv'><p className='recipeDescription'>{recipe.recipedescription}</p></div>
            <div className='ingredientsDiv'>
                <div className='ingredientsHeaderDiv'><h3 className='ingredientsHeader'>Ingredients</h3></div>

                {ingredients.length > 0 ? ingredients.map((ingredient,index)=>{
                    return <p key={index}  className='ingredientsText'> {ingredient}</p>
                }) : (<p className='ingredientsText'> test</p>)}
            </div>


            <div className='preparationDiv'>
                <div className='preparationHeaderDiv'>
                    <h3 className='preparationHeader'>How To Make</h3>
                    <p className='howtomake'>
                        {recipe.recipestep}
                    </p>
                </div>
            </div>
            
            <div className='suggestedContainer'>
                <p className='suggestedHeader'>You might also like</p>
                <hr />
                <div className='suggestedDiv'>
                    {suggested.length > 0 ? (
                        
                        suggested.map((suggest) => (
                        <SuggestedCards key={suggest._id} suggested={suggest} />
                    
                        ))
                    ):(<div> no return</div>)}
                    
                </div>


            </div>
            
            
        </div> )}
        </div>
    )
}