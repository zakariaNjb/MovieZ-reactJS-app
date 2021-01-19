import React from "react";
import "../Css/Actor.css";

function Actor({infos}){

    //var 
    const imgUrl="https://image.tmdb.org/t/p/w500/";

    if(infos.profile_path!==null){
        return(

            <div className="actor__info">
                <img src={imgUrl+infos.profile_path} alt="pict"/>
                <div>
                    <section>
                        <li>Name: {infos.original_name}</li>
                        <li>Department:{infos.known_for_department}</li>
                        <li>Character: {infos.character}</li>
                    </section>
                </div>
            </div>        
        );
    }else return null;
    
};
export default React.memo(Actor);