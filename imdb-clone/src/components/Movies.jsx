import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({
  handleAddtoWatchList,
  handleRemoveFromWatchList,
  watchList,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };
  // to run for one time only when start application
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=8e2bfa5dd3094ffbcc0552c82d9cc10d&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around m-5 gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleAddtoWatchList={handleAddtoWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              movieObj={movieObj}
              watchList={watchList}
            />
          );
        })}
      </div>
      <Pagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        pageNo={pageNo}
      />
    </div>
  );
}

//https://api.themoviedb.org/3/movie/popular?api_key=8e2bfa5dd3094ffbcc0552c82d9cc10d&language=en-US&page=2

export default Movies;
//axios used for http requests GET and POST
