import Loader from "./components/Common/Loader";
import Navbar from "./components/Common/Navbar";
import AllGamesTemplate from "./components/Games/AllGames/AllGamesTemplate";
import GuessTheCountryByMap from "./components/Games/OneGame/GuessTheCountryByMap";
import Quizzes from "./components/Games/OneGame/Quizzes";
import Home from "./components/Home/Home";
import CubesSection from "./components/KnowledgeCubes/CubesSection";
import { useTma } from "./context/tmaProvider";
import { Routes, Route } from "react-router-dom";

function App() {
  const { user, isLoading, isError } = useTma();

  // if (!isLoading) {
  //   return <Loader />;
  // }

  // if (isError) {
  //   return <div>Error fetching user data</div>;
  // }

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="" element={<Home />} />
          <Route path="feed" element={<CubesSection />} />
          <Route path="games/:domain" element={<AllGamesTemplate />} />
          <Route
            path="/game/geography/:mode"
            element={<GuessTheCountryByMap />}
          />
          <Route path="/game/quiz/:domain" element={<Quizzes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
