import React from "react";
import "../Css/Details.css";
//react icons
import {MdSlowMotionVideo} from "react-icons/md";
function Details({details}){
    //var
    const imgUrl="https://image.tmdb.org/t/p/w500/";

    //Functions

    //Display videos on mobiel
    const displayVideos=()=>{
        const conatiner=document.getElementById("movie__information");
        const width=getComputedStyle(conatiner).getPropertyValue("width");
        if(parseInt(width)<=414){
            const mobileSection=document.getElementById("media__sources__mobile");
            mobileSection.style.display="flex";
        }
    };

    if(details!==undefined){
        return(
            <div id="details">
                <div id="name__desc">
                    <img src={imgUrl+details.backdrop_path} alt="pict"/>
                    <div>
                        <span>
                            <li>{details.original_title}</li>
                            <MdSlowMotionVideo onClick={()=>displayVideos()}></MdSlowMotionVideo>
                        </span>
                        <p>{details.overview}</p>
                    </div>
                </div>
                {<div id="details__info">
                    <main>
                        <div>
                            <li>Release Date:</li>
                            <li>{details.release_date}</li>
                        </div>
                        <div>
                            <li>Spoken language:</li>
                            <li>{details.spoken_languages[0].english_name}</li>
                        </div>
                        <div>
                            <li>Rating:</li>
                            <li>{details.vote_average}</li>
                        </div>
                        <div>
                            <li>Genre:</li>
                            <li>{details.genres[0].name}</li>
                        </div>
                        <div>
                            <li>Popularity:</li>
                            <li>{details.popularity}</li>
                        </div>
                        <div>
                            <li>Budget:</li>
                            <li>{details.budget} $</li>
                        </div>
                        <div>
                            <li>Revenue:</li>
                            <li>{details.revenue} $</li>
                        </div> 
                        <div>
                            <li>Production <br></br> countries:</li>
                            <li>{details.production_countries[0]!==undefined? details.production_countries[0].iso_3166_1 : "unknown"}</li>
                        </div>
                    </main>
                </div>}
            </div>
        );
    }else return <div>Loading...</div>
};
export default React.memo(Details);