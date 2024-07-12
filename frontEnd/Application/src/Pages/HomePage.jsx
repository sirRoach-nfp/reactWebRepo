import RecipeCard from '../components/RecipeCard.jsx';
import { useParams,useNavigate } from "react-router-dom";
import '../components/componentStyles/HomePage.css';
import {useState,useEffect,useContext} from 'react';
import axios from 'axios'
import './pagesStyle/HomePage.css'
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { userContext } from '../MainPage.jsx';
import { Buffer } from 'buffer';
import HeroSliderCard from '../components/HeroSliderCard.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';



export default function HomePage(){







    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
  
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },

          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },

          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };








    const navigate = useNavigate();

    const {accountId,isLogged} = useContext(userContext);

    const [recipes,setRecipes] = useState([]);
    const [recommended,setRecommended] = useState([]);
    const [resultCount,setResultCount] = useState([1])
    const [suggestedSlider,setSuggested] = useState([])

    //load state
    const [loadingMain,setLoadingMain] = useState(true)
    const[loadingRecommend,setLoadingRecommend] = useState(true)




    useEffect(() =>{
        const fetchRandomrRecipe = async () => {
            try{
                const res = await axios.get(`https://recipewebsitebackend.onrender.com/api/recipe/recipes/random`)
                const suggestedRes = await axios.get(`https://recipewebsitebackend.onrender.com/api/recipe/recommendedDisplay`);
                setSuggested(suggestedRes.data);
                setRecipes(res.data);
               
            }catch(err){} finally{
                setLoadingMain(false)
            }
        }

    
        
        fetchRandomrRecipe();
    },[])


    useEffect(() => {
        const fetchRecommended = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/recipe/recipes/recommended/${resultCount}`);
                setRecommended(res.data);
             
            } catch(err){
                console.log(err)
            }finally{
                setLoadingRecommend(false);
            }
        }

        fetchRecommended();
    }, [resultCount])



    const postRecipeRedirect = () => {
        if(accountId && isLogged){
            navigate("/PostRecipe")
        }
        else{
            navigate("/Login")
        }
        

    }


    const reloadRecommend = () => {

        setLoadingRecommend(true);
        setResultCount(resultCount + 1);
    }

    return(
        <div>
            {loadingMain ? (<div className='loaderBody'> <CircularProgress size={60}  style={{ color: '#84aa35' }}/></div>) : (<div className='homepageMainBody'>
            
            <div className='heroCarousel'>
                {suggestedSlider.length > 0 ? (
                    <Slider {...settings}>
                        {suggestedSlider.map(recipe => (
                            <HeroSliderCard key={recipe._id} itemData={recipe}/>
                        ))}
                    </Slider>):(

                    <div>none</div>
                )}
                
                
            </div>
            <button className='shareRecipeBut' onClick={postRecipeRedirect}>Share your recipe</button>
            <div className='randomRecipeDiv'>
                {recipes.length > 0 ? recipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe}/>
                )) : <div> no found</div>}
                

            </div>

            <div className='recommendedRecipeDiv'>
                <div className='headerDivR'>
                    <h3 className='headerR'>Recommended Recipes</h3>
                </div>

                {loadingRecommend ? (<div className='progressDivRecommend'> <CircularProgress size={60}  style={{ color: '#84aa35' }} /> </div>) :
                    (                <div className='recommendedRecipeContainer'>
                    {recommended.length > 0 ? recommended.map((recommend) => (
                        <RecipeCard key={recommend._id} recipe={recommend}/>
                    )) : <div> no found</div>}
                    
                    
                </div>)
                
                }

                <button onClick={reloadRecommend} className='loadMoreButton'> Load More</button>
            </div>
            </div>)}


        </div>
        
    )
}
