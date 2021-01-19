import React, { useEffect } from "react";
import {useState} from "react";
import "../Css/MovieInformations.css";
import Details from "../Components/Details";
//import react icons
import {HiOutlineMenuAlt2} from "react-icons/hi";
import {RiSearch2Fill} from "react-icons/ri";
import {BsChevronDoubleLeft,BsChevronDoubleRight} from "react-icons/bs";
import {AiOutlineClose} from "react-icons/ai";
//import Routing
import {Link,Switch,Route} from "react-router-dom";
import Reviews from "./Reviews";
//import api param
import {url,apiKey} from "../../API/ApiParam";
import Videos from "./Videos";


function MovieInformation({match}){
    //States
    const [details, setDetails] = useState(undefined);
    const [reviews,setReviews]=useState(undefined);
    const [isMovFound,setIsMovFound]=useState(true);
    const [videos,setVideos]=useState(undefined);
    const [idMoV,setIdMov]=useState(undefined);

    //Fuctions
    //API Call
    const apiCall=async (path)=>{
        let data=undefined;
        await fetch(path).then(response=>{
            //console.log("Response",response);
            if(response.ok) return response.json();
            else throw Error("Api call has failed");
        }).then(arrivedData=>{
            //console.log("Data has arrived",arrivedData);
            data=arrivedData;
        }).catch(err=>{
            console.log(err);
        });
        return data;
    };

    //Get Details
    const getDetails=async (id)=>{
        const path=url+"movie/"+id+"?api_key="+apiKey+"&language=en-US";
        const data=await apiCall(path);
        console.log("getData",data);
        setDetails(data);
        setIdMov(data.id);
    };

    const getReviews=async (id)=>{
        const path=url+"movie/"+id+"/reviews?api_key="+apiKey+"&language=en-US";
        const data=await apiCall(path);
        //console.log("getReviews",data);
        setReviews(data);
    };

    //getVideos
    const getVideos=async (id)=>{
        const path=url+"movie/"+id+"/videos?api_key="+apiKey+"&language=en-US";
        const data=await apiCall(path);
        //console.log("getVideos",data);
        setVideos(data);
    };

    //Search
    const search=async ()=>{
        const searchInput=document.getElementById("search");
        const value=searchInput.value;
        //look for the movie
        let path=url+"search/movie?api_key="+apiKey+"&language=en-US&query="+value
        +"&page=1&include_adult=false";
        let data=await apiCall(path);
        //get movie details + videos
        if(data.total_pages!==0){
            const id=data.results[0].id;
            //get movie details
            path=url+"movie/"+id+"?api_key="+apiKey+"&language=en-US";
            data=await apiCall(path);
            setDetails(data);
            setIdMov(data.id);
            //get reviews
            path=url+"movie/"+id+"/reviews?api_key="+apiKey+"&language=en-US";
            data=await apiCall(path);
            setReviews(data);
            //get movie videos
            path=url+"movie/"+id+"/videos?api_key="+apiKey+"&language=en-US";
            data=await apiCall(path);
            setVideos(data);
            setIsMovFound(true);
        }else setIsMovFound(false);
    };

    //right +left two ftcs to control left and right icon
    const right=()=>{
        const rightBtn = document.getElementById("details__btn");
        const leftBtn = document.getElementById("reviews__btn");
        rightBtn.style.display = "block";
        leftBtn.style.display = "none";
    }
    const left=()=>{
        const rightBtn=document.getElementById("details__btn");
        const leftBtn=document.getElementById("reviews__btn");
        rightBtn.style.display="none";
        leftBtn.style.display="block";
    };

    //Close trailes section on mobile
    const close=()=>{
        const section=document.getElementById("media__sources__mobile");
        section.style.display="none";
    };

    useEffect(()=>{
        //Get Details + Reviews + vedios
        getDetails(match.params.movieId);
        getReviews(match.params.movieId);
        getVideos(match.params.movieId);
    },[match.params.movieId]);


    return (
        <main id="movie__information">
            <section id="infos">
                <nav>
                    <Link to="/"><HiOutlineMenuAlt2></HiOutlineMenuAlt2></Link>
                    <div>
                        <input type="text" id="search" placeholder="Search"/>
                        <RiSearch2Fill onClick={()=>search()}></RiSearch2Fill>
                    </div>
                </nav>
                {/*******Details contains informations like 
                 rating genre,spoken language...******/}
                <Switch>
                    {isMovFound ? 
                    <Route exact path={match.url+"/Reviews"}  component={()=><Reviews reviews={reviews}></Reviews>}></Route>
                    : <div className="err">Sorry, the movie you are looking for is not available for now </div>}
                    {isMovFound ? 
                    <Route path={match.url} component={()=><Details details={details}></Details>}></Route>
                    :<div className="err">Sorry, the movie you are looking for is not available for now </div>}
                </Switch>
                <div id="links">
                    <div>
                        <Link  onClick={()=>right()} to={match.url+"/Reviews"}>
                            <BsChevronDoubleRight  id="reviews__btn"></BsChevronDoubleRight>
                        </Link>
                        <Link onClick={()=>left()} to={match.url}>
                            <BsChevronDoubleLeft id="details__btn"></BsChevronDoubleLeft>
                        </Link>
                        
                    </div>
                    <Link to={"/MoreMovies/"+idMoV} id="similar__recomended">Similar & recomended movies</Link>
                </div>
            </section>
            <section id="media__sources">
                {videos!==undefined ?
                <Videos videos={videos.results}></Videos>:    
                <div className="noMovies">There is no movie available for now</div>}
            </section>
            <section id="media__sources__mobile">
                <div>
                    <span>Trailers</span>
                    <AiOutlineClose onClick={()=>close()}></AiOutlineClose>
                </div>
                {videos!==undefined ?
                <Videos videos={videos.results}></Videos>:    
                <div className="noMovies">There is no movie available for now</div>}
            </section>
        </main>
    );
};
export default React.memo(MovieInformation);