import {BrowserRouter as  Router,Routes,Route,Navigate,Link,useNavigate} from "react-router-dom"
import './HomePag.css'
import LoginPage from './LoginPage.jsx'
import AccountPage from './Pages/AccountPage.jsx'
import HomePageB from './Pages/HomePage.jsx'
import {useState,useEffect,createContext} from 'react'
import PostRecipe from './components/PostRecipeComponent.jsx'
import RecipePage from './Pages/RecipePage.jsx'
import ResultPage from "./Pages/ResultPage.jsx"
import EditPage from "./Pages/EditPage.jsx"
import RegisterPage from "./Pages/RegisterPage.jsx"

import SearchIco from './assets/searchIcos.svg'
export default function HomePage(){
     


        //session
        const [accountId,setAccountId] = useState("");
        const [isLogged,setLogged] = useState(false);
        const [userName,setUser] = useState("")
    

        //search    
        const [search,setSearch] = useState();
        console.log(search)

        useEffect(() => {
            console.log(accountId)
            console.log(userName);
        },[])



    return(
        <div className="homePage">
            <Router>
                <div className="topNav">
                    <div className="logoDiv"><h3 className="logo">BiteBuddy</h3></div>
                    <div className="searchDiv">
                        <input type="text" className="searchBar" onChange={(e) => setSearch(e.target.value)}/>
                
                            {search !== "" && <Link to={`/Search/${search}`}><button className="searchButton"><img src={SearchIco} alt="" className="searchIco"/></button></Link>}
                           
                 
                    </div>
                    <div className="navigations">
                        <Link className="navItems" to={"/"}>Home</Link>
                        <Link  className="navItems"> Explore</Link>

                        {accountId === "" ? (<Link className="navItems" to={"/Login"}>Login</Link>) 
                        : (<Link className="navItems" to={`/account/${accountId}`}>{userName}</Link>)}
                        
                        <div className="account"></div>

                    </div>

                </div>

                <userContext.Provider value={{accountId,setAccountId,isLogged,setLogged,setUser,userName}} >
                    <Routes>
                        <Route path="/" element={<HomePageB/>}/>
                        <Route path="/Login" element={<LoginPage/>}/>
                        <Route path="/account/:id" element={<AccountPage/>}/>
                        <Route path='/PostRecipe' element={<PostRecipe/>}/>
                        <Route path="/Recipe/:recipeId" element={<RecipePage/>}/>
                        <Route path="/Search/:searchValue" element={<ResultPage/>}/>
                        <Route path="/Edit/:recipeId" element={<EditPage/>}/>
                        <Route path="/Register" element={<RegisterPage/>} />
                    </Routes>
                </userContext.Provider>
            </Router>
        </div>
    )
}


export const userContext  = createContext();