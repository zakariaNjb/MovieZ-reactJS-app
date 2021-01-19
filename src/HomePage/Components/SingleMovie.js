import React from "react";
import "../Css/SingleMovie.css";
import {Link} from "react-router-dom";
import {AiFillStar} from "react-icons/ai";
import {MdSlowMotionVideo} from "react-icons/md";

function SingleMovie({infos}){

    //Variables
    const imgUrl="https://image.tmdb.org/t/p/w500/";

    return (
        <div className="single__movie">
            {(infos.poster_path!=null) ? 
                <img src={imgUrl+infos.poster_path} alt="pict"/>:
                <img src={imgUrl+infos.backdrop_path} alt="pict"/>}
            <div className="single__movie__infoContainer">
                <div className="rating">
                    <span>{infos.vote_average}</span>
                    <AiFillStar></AiFillStar>
                </div>
                <div className="movie__name">
                    <Link to={"/MovieInformation/"+infos.id}><MdSlowMotionVideo></MdSlowMotionVideo></Link>
                    <span>{infos.title}</span>
                </div>
            </div>
        </div>
    );
};
export default React.memo(SingleMovie);
