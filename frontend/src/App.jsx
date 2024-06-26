import Navbar from "./components/Common/Navbar";
import GeographyGames from "./components/Games/AllGames/GeographyGames";
import GuessTheCountryByMap from "./components/Games/OneGame/GuessTheCountryByMap";
import Home from "./components/Home/Home";
import CubesSection from "./components/KnowledgeCubes/CubesSection";
import { useTma } from "./context/tmaProvider";
import { Routes, Route } from "react-router-dom";

function App() {
  const { user, isLoading, isError } = useTma();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isError) {
  //   return <div>Error fetching user data</div>;
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="" element={<Home />} />
          <Route path="feed" element={<CubesSection />} />
          <Route path="games/geography" element={<GeographyGames />} />
          <Route
            path="games/geography/guess-the-country-by-map"
            element={<GuessTheCountryByMap />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
