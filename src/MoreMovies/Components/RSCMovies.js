import React, { useState } from "react";
import {useEffect} from "react";
import "../Css/RSCMovies.css";
//API param
import {url,apiKey} from "../../API/ApiParam";
//React icons
import {AiOutlineArrowLeft} from "react-icons/ai";
import {IoLogoFacebook} from "react-icons/io";
import {RiInstagramFill} from "react-icons/ri"
//Routing 
import {Link} from "react-router-dom";
//Components
import RecommendedSimilarActors from "./RecommendedSimilarActors";


function RSCMovies({match}){

    //States
    const [recommendedMovies,setRecommendedMovies]=useState(undefined);
    const [similarMovies,setSimilarMovies]=useState(undefined);
    const [actors,setActors]=useState(undefined);

    //Functions
    const apiCall=async (path)=>{
        let data=undefined;
        await fetch(path).then(response=>{
            //console.log("Response",response);
            if(response.ok) return response.json();
            else throw Error("API call has failed");
        }).then(arrivedData=>{
            //console.log("arrivedData",arrivedData);
            data=arrivedData;
        }).catch(err=>{
            console.log(err);
        });
        return data;
    };

    //getRecommeded movies
    const getRecommeded=async (id)=>{
        const path=url+"movie/"+id+"/recommendations?api_key="+apiKey+"&language=en-US&page=1";
        const data=await apiCall(path);
        if(data.results[0]!==undefined) setRecommendedMovies(data.results);
    };
    
    //getSimilar movies
    const getSimilar=async (id)=>{
        const path=url+"movie/"+id+"/similar?api_key="+apiKey+"&language=en-US&page=1";
        const data=await apiCall(path);
        if(data.results[0]!==undefined) setSimilarMovies(data.results);
    };

    //getActors
    const getActors=async (id)=>{
        const path=url+"movie/"+id+"/credits?api_key="+apiKey+"&language=en-US";
        const data=await apiCall(path);
        setActors(data.cast);
    };

    //user Selection (recomended or similar or actors)
    const changeTitle=(event)=>{
        const value=event.target.textContent;
        const title=document.getElementById("title");
        title.textContent=value;
        if(value.toLowerCase()==="recommended" || value.toLowerCase()==="similar")
            title.textContent=value+" movies";
    };

    //Hooks
    useEffect(()=>{
        //get recommended movies + similar movies +actors
        getRecommeded(match.params.movieId);
        getSimilar(match.params.movieId);
        getActors(match.params.movieId);
    },[]);

    return (
        <main id="more">
            <nav>
                <Link to={"/MovieInformation/"+match.params.movieId}><AiOutlineArrowLeft></AiOutlineArrowLeft></Link>
                <div>  
                    <Link onClick={(event)=>changeTitle(event)} to={match.url+"/Recommended"}>Recommended</Link>
                    <Link onClick={(event)=>changeTitle(event)} to={match.url+"/Similar"}>Similar</Link>
                    <Link onClick={(event)=>changeTitle(event)} to={match.url+"/Actors"}>Actors</Link>
                </div>
            </nav>
            <div id="rsc__container">
                <RecommendedSimilarActors
                    match={match} 
                    similarMovies={similarMovies}
                    recommendedMovies={recommendedMovies}
                    actors={actors}
                ></RecommendedSimilarActors>
            </div>
            <footer>
                <span style={{color:"grey"}}>Copy right: Zakaria najib</span>
                <div id="contact"> 
                    <span>+212708865832</span>
                    <a href="https://www.facebook.com/profile.php?id=100007073655281" target="_blank"><IoLogoFacebook></IoLogoFacebook></a>
                    <a href="https://www.instagram.com/zakaria_njb/?hl=fr" target="_blank"><RiInstagramFill></RiInstagramFill></a>
                </div>
            </footer>
        </main>
    );
};
export default React.memo(RSCMovies);