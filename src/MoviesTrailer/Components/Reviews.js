import React from "react";
import "../Css/Reviews.css";

function Reviews({reviews}){
    //Variables
    const imgUrl="https://image.tmdb.org/t/p/w500/";

    if(reviews!==undefined){
        return (
            <div id="reviews">
                <h2>Reviews</h2>
                {reviews.results.map((Element,index)=>{
                    if(Element.author_details.avatar_path!=null)
                    return (<main key={Element.id}>
                        <img src={Element.author_details.avatar_path.includes("https") ?
                        Element.author_details.avatar_path.substring(1) : imgUrl+Element.author_details.avatar_path} alt="img"></img>
                        <div>
                            <li>{Element.author_details.username}</li>
                            <p>{Element.content.substring(0,200)+"..."}</p>
                            <a style={{color:"grey"}} href={Element.url} target="_blank"> Read more...</a>
                        </div>
                    </main>);
                    else return null;
                })}
            </div>
        );
    }else return <div>there is something</div>
};
export default React.memo(Reviews);