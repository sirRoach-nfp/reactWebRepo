
import './componentStyles/SharedRecipeCard.css'
import { Link,  useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer';

export default function SharedRecipeCard({recipe}){
    
    const navigate = useNavigate();

    let base64Image = '';

    if(recipe.recipephoto && recipe.recipephoto.data){
        const base64string = Buffer.from(recipe.recipephoto.data).toString('base64');
        base64Image = `data:image/jpeg;base64,${base64string}`;
    }
    else if(typeof recipe.recipephoto === 'string'){
        base64Image = `data:image/jpeg;base64,${recipe.recipephoto}`;
    }


    const navigateEdit = () =>{
        navigate(`/Edit/${recipe._id}`)
    }

    return(
        <div className="sharedcardmain">
            <div className="sharedcardImageContainer">
                <img src={base64Image} alt="" className='sharedImageCardPhoto'/>
            </div>
            <div className="sharedcardInfoDiv">
                <p className="sharedTitleTag">{recipe.recipetitle}</p>
                <p className="sharedTimeTag">{recipe.preptime} mins</p>
                <div className="buttonDivs">
                    <button className="sharedButtons" id='sharedEditButton' onClick={navigateEdit}>Edit</button>
                  
                </div>
            </div>
        </div>
    )
}