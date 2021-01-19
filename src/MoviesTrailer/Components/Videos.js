import React from "react";
import "../Css/Videos.css";
//react icons
import {BsChevronDoubleRight} from "react-icons/bs";
import {BsChevronDoubleLeft} from "react-icons/bs";

function Videos({videos}){

    //Var
    const videoUrl="https://www.youtube.com/embed/";

    //Scroll left & right
    const scrollRight=()=>{
        const section=document.querySelector(".videos section");
        const width=getComputedStyle(section).getPropertyValue("width");
        section.scrollBy(parseInt(width)+1,0);
    };
    const scrollLeft=()=>{
        const section=document.querySelector(".videos section");
        const width=getComputedStyle(section).getPropertyValue("width");
        section.scrollBy(-parseInt(width)-1,0);
    };

    if(videos.length!==0){
        return(
            <main className="videos">
                <section>
                    {videos.map((Element,index)=>{
                        return (<iframe  
                            key={Element.id}
                            src={videoUrl+Element.key} 
                            title={Element.name}>
                        </iframe>);
                    })}
                </section>
                <section>
                    <BsChevronDoubleLeft onClick={()=>scrollLeft()}></BsChevronDoubleLeft>
                    <BsChevronDoubleRight onClick={()=>scrollRight()}></BsChevronDoubleRight>
                </section>
            </main>
        );
    }else return <div className="noMovies">There are no trailers available for now</div>
};
export default React.memo(Videos);