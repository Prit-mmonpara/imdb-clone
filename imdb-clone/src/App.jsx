import { useState, useEffect } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [watchList, setwatchList] = useState([]);

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchList, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setwatchList(newWatchList);
    console.log(newWatchList);
  };

  useEffect(() => {
    const storedWatchList = localStorage.getItem("moviesApp");
    if (storedWatchList) {
      setwatchList(JSON.parse(storedWatchList));
    }
  }, []);

  let handleRemoveFromWatchList = (movieObj) => {
    let filterWatchList = watchList.filter((movie) => {
      return movie.id != movieObj.id;
    });
    localStorage.setItem("moviesApp", JSON.stringify(filterWatchList));
    setwatchList(filterWatchList);
    console.log(filterWatchList);
  };

  return (
    <>
      <BrowserRouter>
        {/*  no need to implement routing for navbar */}
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  handleAddtoWatchList={handleAddtoWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  watchList={watchList}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchList={watchList}
                setWatchList={setwatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
