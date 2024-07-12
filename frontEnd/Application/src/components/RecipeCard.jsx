
import './componentStyles/RecipeCard.css';
import { Link,  useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer';

export default function RecipeCard({recipe}){

    const navigate = useNavigate();

    const redirectPage = () => {
        navigate(`/Recipe/${recipe._id}`)
    }

    


    let base64Image = '';
    if (recipe.recipephoto && recipe.recipephoto.data) {
        const base64string = Buffer.from(recipe.recipephoto.data).toString('base64');
        base64Image = `data:image/jpeg;base64,${base64string}`;
    } else if (typeof recipe.recipephoto === 'string') {
        base64Image = `data:image/jpeg;base64,${recipe.recipephoto}`;
    }

   
   //const base64string = Buffer.from(recipe.recipephoto.data).toString('base64');
   //const base64Image = `data:image/jpeg;base64,${recipe.recipephoto}`;


    return(
        <div className="recipecardcontainer">
            <div className='imageContainer'>
              <img src={base64Image} alt=""className='recipePhoto' />
            </div>
            <div className='infoCardDiv'>
                <p className='recipeTitle'>{recipe.recipetitle}</p>
                <div className='descriptionDiv'></div>
                <p className='timeTag'>{recipe.preptime} minutes</p>
                <button className='readButton' onClick={redirectPage}>Read</button>
            </div>

            
        </div>
    )
}