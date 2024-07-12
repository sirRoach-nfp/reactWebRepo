import './componentStyles/HeroSliderCard.css'
import ImageGallery from 'react-image-gallery';
import {useNavigate} from 'react-router-dom'
import { Buffer } from 'buffer';



export default function HeroSliderCard({itemData}){
    let base64Image = '';
    if (itemData.recipephoto && itemData.recipephoto.data) {
        const base64string = Buffer.from(itemData.recipephoto.data).toString('base64');
        base64Image = `data:image/jpeg;base64,${base64string}`;
    } else if (typeof  itemData.recipephoto === 'string') {
        base64Image = `data:image/jpeg;base64,${itemData.recipephoto}`;
    }

    const images = [
        {
            original: base64Image,
        }
    ]


    const navigate = useNavigate();

    const redirectToRecipe = () => {
        navigate(`/Recipe/${itemData._id}`)
    }

    //const snapshotData = itemData.recipephoto.data;
    console.log(base64Image);
    return(
        <div className="heroSliderCard" style={{backgroundImage: `url(${base64Image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition:'center'}} onClick={redirectToRecipe}>
            <div className='itemInfoDiv'>
                <h3 className='itemTitle'>{itemData.recipetitle}</h3>
                <p className='itemAuthor'>By: {itemData.author}</p>

            </div>
            {/* <img src={base64Image} alt="" /> */}
          
        </div>
    )
}
