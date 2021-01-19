import React from "react";
import "../Css/Movies.css";
import SingleMovie from "../Components/SingleMovie";

function Movies({movies}){
    
    //Styling failed Message
    const style={
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"2em",
        textAlign:"center",
        height:"100%",
        color:"#E1C562"
    };

    //movies in an array of movies
    if(movies.length>0) return(
            <main id="movies">
                {movies.map(Element=>{
                    if(Element.poster_path!=null || Element.backdrop_path!=null) 
                        return (<SingleMovie key={Element.id} infos={Element}></SingleMovie>);
                    else return null;
                })}
            </main>
        );
    else return (
        <div style={style}>Sorry, the movie you are looking for is not available for now</div>
    );
};
export default React.memo(Movies);