
import {Buffer} from 'buffer';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './componentStyles/SuggestedCards.css'


export default function SuggestedCards({suggested}){

    const navigate = useNavigate();
    let base64Image = '';


    if(suggested.recipephoto && suggested.recipephoto.data){
        const base64String = Buffer.from(suggested.recipephoto.data).toSring('base64');
        base64Image = `data:image/jpeg;base64,${base64String}`;
    }
    else if(typeof suggested.recipephoto === 'string'){
        base64Image = `data:image/jpeg;base64,${suggested.recipephoto}`;
    }


    const navigateProductPage = () => {
        navigate(`/Recipe/${suggested._id}`);
    }

    return(
        <> 
        <div className='suggestedCardsdiv' onClick={navigateProductPage} >
            <div className='suggestedImageDiv'>
                <img src={base64Image} alt="" className='suggestedImage'/>
            </div>
            <div className='suggestedInfo'>
                <p className='suggestedInfoTag' id='suggestedTitleTag'>{suggested.recipetitle}</p>
                <p className='suggestedInfoTag' id='suggestedTimeTag'>{suggested.preptime} minutes</p>
                <p className='suggestedInfoTag' id='suggestedAuthorTag'>By: {suggested.author}</p>
            </div>
          
        </div>
        <hr />
        </>
    )
}