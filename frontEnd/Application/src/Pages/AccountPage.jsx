import { useParams,useNavigate } from "react-router-dom";
import{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { userContext } from '../MainPage';
import PostRecipe from '../components/PostRecipeComponent.jsx'
import './pagesStyle/AccountPage.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import SharedRecipeCard from "../components/SharedRecipeCard.jsx";
import CircularProgress from '@mui/material/CircularProgress';


export default function AccountPage(){


    //load
    const [contentLoading,setContentLoading] = useState(true);

    const navigate = useNavigate();

    const {setAccountId,setLogged} = useContext(userContext)

    const { id: accountId } = useParams();
    const [account,setAccount] = useState([]);


    //shared recipe 
    const [recipe,setRecipe] = useState([])


    
    useEffect(() => {

        const fetchAccount = async () => {
            try{
                const res = await axios.post(`http://localhost:5000/api/users/account/${accountId}`);
                const recipeData = await axios.get(`http://localhost:5000/api/recipe/shared/${res.data.username}`);

                
                setAccount(res.data);
                setRecipe(recipeData.data)
            } catch(err){
                console.log(err)
            }
            finally{
                setContentLoading(false);
            }
        }

        fetchAccount();

    },[])


    const handleLogout = () => {
   
        setAccountId("");
        setLogged(false);
        navigate("/Login")

    }
    
    return(

        <div>
            <hr />
            {contentLoading ? (<div className='loaderBody'> <CircularProgress size={80}/>  </div>) : ( <div className="accountpagemain">
                <div className="accountInfoDiv">
                    <div className="pfpDiv"><Avatar sx={{ bgcolor: deepOrange[500], width:60,height:60 }}/></div>
                    <div className="detailsDiv">
                        <h3 className="accountTag">{account.username}</h3>
                        <p className="emailTag">{account.email}</p>
                        <button className="logoutbutton" onClick={handleLogout}>Logout</button>
                    </div> 

                   
                </div>
                <div className="contentsDiv">
                        <div className="contentHeaderDiv">
                            <h3 className="contentHeader">Shared Recipes</h3>
                        </div>

                        <div className="cardsDiv">
                            {recipe.length > 0 ? recipe.map((recip) => (<SharedRecipeCard key={recip._id } recipe={recip}/>))  : (<div> <h1>no result</h1> </div>)}
                        </div>
                </div>
                

            </div>)}
        </div>
       
    
    )
}