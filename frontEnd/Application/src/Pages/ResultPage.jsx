
import { useParams } from "react-router-dom";
import {useState,useEffect} from 'react'
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import './pagesStyle/ResultPage.css'
import CircularProgress from '@mui/material/CircularProgress';
export default function ResultPage() {
    const {searchValue} = useParams();

    const [results,setResults] = useState([]);

    //load
    const [loadResult,setLoadResult] = useState(true);

    useEffect(() =>{ 

        setLoadResult(true);
        const fetchResults = async() => {
            try{
                if(searchValue !== ""){
                    const res = await axios.get(`http://localhost:5000/api/recipe/Search/${searchValue}`);
                    setResults(res.data)
                    console.log(res.data)
                }
                else{
                    const res = await axios.get(`http://localhost:5000/api/recipe/recipes/random`);
                    setResults(res.data);
                }
                
              
                
            }catch(err){}finally{
                setLoadResult(false)
            }
        }


        fetchResults();
    }
    ,[searchValue])

    console.log(results.length)

    return(
        <div>
            <div className="resultpagemain">
                <div className="resultHeaderDiv">
                    <h3 className="resultHeader">Search result for "{searchValue}"</h3>
                </div>
                {loadResult ? ( <div className="progressDivResult" ><CircularProgress size={60}  style={{ color: '#84aa35' }}/>  </div>) : (<div className="contentDiv">
                    {results.length > 0 ? results.map((result) => (
                        <RecipeCard key={result._id} recipe={result} />
                    )) : <div><h1>No result</h1></div>}
                </div>)}
            </div>
        </div>
    );
}