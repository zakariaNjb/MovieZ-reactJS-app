import React from "react";
import "../Css/RecommendedSimilarActors.css";
//React icons
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai";
//components
import SingleMovie from "../../HomePage/Components/SingleMovie";
import Actor from "../Components/Actor";
//React router
import {Switch,Route} from "react-router-dom";

function RecommendedSimilar({match,recommendedMovies,similarMovies,actors}){

    //functions
    //Controll scrolling to left & right
    const moveRight=()=>{
        const container=document.getElementById("movies__section");
        container.scrollBy(500,0);
    };
    const moveLeft=()=>{
        const container=document.getElementById("movies__section");
        container.scrollBy(-500,0);
    };

    return (
        <div id="recommended__similar">
            <section id="text__recommended__similar">
                <h2 id="title">Recommended movies</h2>
                <p>Recommended & similar movies sections are films with the same, or very similar, plot produced or released at the same time by two different film studios. Actors sections gives you information about the actors crew.</p>
                <div>
                    <AiOutlineLeft onClick={()=>moveRight()}></AiOutlineLeft>
                    <AiOutlineRight onClick={()=>moveLeft()}></AiOutlineRight>
                </div>
            </section>
            <section id="movies__section">
                <Switch>

                    {/******Display similar movies*****/}
                   <Route exact path={match.url+"/Similar"} component={()=>(similarMovies!==undefined ? similarMovies.map((Element,index)=>{
                    return <SingleMovie infos={Element} key={index}></SingleMovie>
                    }):null)}></Route>
                    
                    {/****************Actors********************/}
                    <Route exact path={match.url+"/Actors"} component={()=>(actors!==undefined ? actors.map((Element,index)=>{
                    return <Actor infos={Element} key={index}></Actor>
                    }):null)}></Route>

                    {/************Display Recommended movies*********/}
                   <Route path={match.url} component={()=>(recommendedMovies!==undefined ? recommendedMovies.map((Element,index)=>{
                    return <SingleMovie infos={Element} key={index}></SingleMovie>
                    }):null)}></Route>

                </Switch>
            </section>
        </div>
    );

};
export default React.memo(RecommendedSimilar);