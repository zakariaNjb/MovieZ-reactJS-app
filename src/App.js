import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom";
//importing Components
import Home from "./HomePage/Components/Home";
import RSCMovies from "./MoreMovies/Components/RSCMovies";
import MovieInformations from "./MoviesTrailer/Components/MovieInformations";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/MovieInformation/:movieId" component={MovieInformations}></Route>
          <Route path="/MoreMovies/:movieId" component={RSCMovies}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
