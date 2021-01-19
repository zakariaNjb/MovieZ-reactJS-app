import React, { useState, useEffect, useRef } from "react";
import "../Css/Home.css";
//Materia ui + react icon
import  {RiSearch2Fill} from "react-icons/ri";
import {AiOutlineYoutube} from "react-icons/ai";
import {BsChevronLeft,BsChevronRight} from "react-icons/bs";
//Api param
import {url,apiKey} from "../../../src/API/ApiParam";
//Components
import Movies from "../Components/Movies";


//var to track the last user genre click
let clickedItem=null;
//var to track the user selected page
let clickedPage=null;

function Home(){

    //Sates
    const [genres,setGenres]=useState(undefined);
    const [movies,setMovies]=useState(undefined);
    const defaultGenre=useRef(undefined);

    // functions
    const apiCall=async (path)=>{
        let data=undefined;
        await fetch(path).then(response=>{
            //console.log("Response",response);
            if(response.ok) return response.json();
            else throw Error("Api call has failed");
        }).then(arrivedData=>{
            //console.log("Data has arrived",arrivedData);
            data=arrivedData;
        }).catch(err=>console.log(err));
        return data;
    };

    //API call to get list of genres & top rated movies
    const getGenresTopRated=async ()=>{
        let path=url+"genre/movie/list?api_key="+apiKey;
        let data=await apiCall(path);
        setGenres(data);
        path=url+"movie/top_rated?api_key="+apiKey;
        data=await apiCall(path);
        data.currGenre="top_rated";
        setMovies(data);
        defaultGenre.current.style.color="snow";
        clickedItem=defaultGenre.current;
    };

    //Controll scrolling to left & right
    const moveRight=()=>{
        const container=document.getElementById("options");
        container.scrollBy(300,0);
    };
    const moveLeft=()=>{
        const container=document.getElementById("options");
        container.scrollBy(-300,0);
    };

    //Set only 10 pages is used in #pages div
    const onlyTenPages=(nbrPages=0)=>{
        if(nbrPages>9) nbrPages=10;
        let arr=[];
        for(let i=0;i<nbrPages;i++) arr.push(i+1);
        return arr;
    };

    //Next page used to display next page of movies
    const nextPage=async(event)=>{
        if(clickedPage!==null){
            clickedPage.style.backgroundColor="transparent";
            clickedPage.style.color="grey";
        }
        const li=event.target;
        li.style.color="black";
        li.style.backgroundColor="#E1C562";
        clickedPage=li;
        const nbr=li.getAttribute("data-nbrpages");
        let currGenre=li.getAttribute("data-currgenre");
        currGenre=currGenre.split("_").join(" ");
        //Scroll to the top
        const moviesContainer=document.getElementById("movies");
        if(moviesContainer!=null) 
        moviesContainer.scrollTo( {top: "0", behavior: 'smooth' });
        await getMovies(currGenre,setMovies,nbr);
    };

    //SetMovies based on user selected genre, this ftc will be used to set movies
    const getMovies=async (value,setMovies,nbrOfPage=1)=>{
        let path=undefined,data=undefined; 
        //data.currGenre used to keep on track genre of movies we are getting
        switch(value.toLowerCase()){
            case "top rated":
                path=url+"movie/top_rated?api_key="+apiKey+"&page="+nbrOfPage;
                data=await apiCall(path);
                data.currGenre=value;
                setMovies(data);
            break;

            case "upcoming":
                path=url+"movie/upcoming?api_key="+apiKey+"&page="+nbrOfPage;
                data=await apiCall(path);
                data.currGenre=value;
                setMovies(data);
            break;

            case "popular":
                path=url+"movie/popular?api_key="+apiKey+"&page="+nbrOfPage;
                data=await apiCall(path);
                data.currGenre=value;
                setMovies(data);
            break;

            default: 
                path=url+"search/movie?api_key="+apiKey+"&language=en-US&query="+value+"&include_adult=false&page="+nbrOfPage;
                data=await apiCall(path);
                data.currGenre=value;
                setMovies(data);
            break;
        }
    };

    //API call to get movies of a specific genres
    const selectedGenre=(event)=>{
        const li=event.target;
        const value=li.textContent;
        //Scroll to the top before displaying movies
        const moviesContainer=document.getElementById("movies");
        if(moviesContainer!=null) 
        moviesContainer.scrollTo( {top: "0", behavior: 'smooth' });
        //Getting movies
        getMovies(value,setMovies);
        //handling the clicked items
        if(clickedItem!=null) clickedItem.style.color="grey";
        if(clickedPage!=null){
            clickedPage.style.backgroundColor="transparent";
            clickedPage.style.color="grey";
        }
        li.style.color="snow";
        clickedItem=li;
        const gender=document.getElementById("genre");
        gender.innerHTML=value;
    };

    //Search
    const search=()=>{
        const value=document.getElementById("searchInput").value;
        //Scroll to the top before displaying movies
        const moviesContainer=document.getElementById("movies");
        if(moviesContainer!=null) 
        moviesContainer.scrollTo( {top: "0", behavior: 'smooth' });
        getMovies(value,setMovies,1);
    };

    //Hooks
    useEffect(() => {
        //getting movies genre & top rated movies
        getGenresTopRated();
        //Clean up
        return ()=>{
            //clean up 
            let items=document.getElementsByTagName("li");
            for(let i=0;i<items.length;i++){
                console.log("clean up")
                items[i].removeEventListener("click",nextPage);
                items[i].removeEventListener("click",selectedGenre);
            }
        };
    },[]);


    return(
        <main id="home">
            <section className="menu__section">
                <header id="about__me">
                    <img 
                    src="https://as2.ftcdn.net/jpg/02/83/78/41/500_F_283784192_rwmFx7idBJKJp2ubfsZoYHlf9ODLSQC9.jpg" 
                    alt="my profile"/>
                    <div>
                        <li>Copy right:</li>
                        <li style={{color:"grey"}}>zakaria najib</li>
                    </div>
                </header>
                <div id="menu">
                    {genres!==undefined ? genres.genres.map(Element=>{
                        return <li 
                            key={Element.id}
                            data-id={Element.id} 
                            onClick={event=>selectedGenre(event)}
                            >{Element.name}</li>
                    }) : null}               
                </div>
                <div id="backColor">
                    <AiOutlineYoutube></AiOutlineYoutube>
                </div>
            </section>
            <section className="movies__section">
                <nav id="navBar">
                    <main>
                        <div>
                            <span id="genre">Top rated</span>
                            <img src="https://miro.medium.com/max/3840/0*9sGv97nP4gn9B6bt.jpg" alt="pict"/>
                            <img src="https://i.pinimg.com/originals/43/d8/6c/43d86c28e777be11848905460c49fc48.jpg" alt="pict"/>
                            <img src="https://m.media-amazon.com/images/M/MV5BMGM0MTU3MDMtMDUyYy00YTMxLTg1NGMtMTBiMzkxYWEzMmNjXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_UY268_CR16,0,182,268_AL_.jpg" alt="pict"/>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQklVQlTT_g80jpw7fPHtPoBgETKZDDwsHGOw&usqp=CAU" alt="pict"/>    
                        </div>
                        <button>
                            <input type="text" 
                            id="searchInput" 
                            placeholder=" Search"/> 
                            <RiSearch2Fill id="searchBtn" onClick={()=>search()}></RiSearch2Fill>
                        </button>
                    </main>
                    <main>
                        <header id="options">
                            <div>  
                                <li onClick={event=>selectedGenre(event)} ref={defaultGenre}>Top rated</li>
                                <li onClick={event=>selectedGenre(event)}>Upcoming</li>
                                <li onClick={event=>selectedGenre(event)}>Popular</li>
                            </div>
                            <div id="options__Genres">
                                {genres!==undefined ? genres.genres.map(Element=>{
                                return <li 
                                    key={Element.id}
                                    data-id={Element.id} 
                                    onClick={event=>selectedGenre(event)}
                                    >{Element.name}</li>
                                }) : null}
                            </div>
                            <div className="pages pageOne">
                                {movies!==undefined ? 
                                onlyTenPages(movies.total_pages).map((Element,index)=>{
                                    return <li 
                                        onClick={(event)=>nextPage(event)}
                                        data-currgenre={movies.currGenre}
                                        data-nbrpages={index+1} 
                                        key={index+1}>{index+1}
                                    </li>
                                }): null}
                            </div>
                        </header>
                        <header id="scrolling">
                            <BsChevronLeft 
                                className="btnLeft" 
                                style={{color:"snow"}}
                                onClick={moveLeft}
                            ></BsChevronLeft>
                            <div className="pages pageTwo">
                                {movies!==undefined ? 
                                onlyTenPages(movies.total_pages).map((Element,index)=>{
                                    return <li 
                                        onClick={(event)=>nextPage(event)}
                                        data-currgenre={movies.currGenre}
                                        data-nbrpages={index+1} 
                                        key={index+1}>{index+1}
                                    </li>
                                }): null}
                            </div>
                            <BsChevronRight 
                                className="btnRight" 
                                style={{color:"snow"}}
                                onClick={moveRight}
                            ></BsChevronRight>
                        </header>
                    </main>         
                </nav>
                {/*********Movies Component***** */}
                {movies!==undefined ? 
                <Movies movies={movies.results}></Movies> :null}
            </section>
        </main>
    );
};
export default React.memo(Home);