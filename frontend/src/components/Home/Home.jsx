import { Link } from "react-router-dom";
import "./Home.css";
import { CircleHelp, Clock, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useTma } from "../../context/tmaProvider";
import axios from "axios";

function Home() {
  const domainList = [
    {
      name: "Geography",
      ref: "/games/geography",
      img: "/geo.png",
    },
    {
      name: "Technology",
      ref: "/games/tech",
      img: "/tech.png",
    },
    {
      name: "General Knowledge",
      ref: "/games/gk",
      img: "/gk.png",
    },
  ];
  const apiUrl = import.meta.env.VITE_API_KEY;
  const { setIsLoading } = useTma();
  const [fotd, setfotd] = useState({});
  const [randomfact, setrandomfact] = useState({});

  const fetchFOTD = async () => {
    setIsLoading(true);
    try {
      const responce = await axios.get(`${apiUrl}facts/fotd`);
      setfotd(responce.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRandomFact = async () => {
    setIsLoading(true);
    try {
      const responce = await axios.get(`${apiUrl}facts/1`);
      setrandomfact(responce.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFOTD();
    fetchRandomFact();
  }, []);

  return (
    <div className="Home">
      <img src="/landing.png" className="landingImg" alt="" />
      <h2>Domains</h2>
      <div className="domainsContainer">
        {domainList.map((domain, index) => (
          <Link to={domain.ref} key={index}>
            <img src={domain.img} alt="" />
            <p>{domain.name}</p>
          </Link>
        ))}
      </div>
      <div className="fotdCard">
        <span>
          <Clock />
          Fact of the day !
        </span>
        <p>{fotd.fact}</p>
      </div>
      <div className="fotdCard">
        <span>
          <CircleHelp />
          Do You Know that?
          <RefreshCcw
            style={{
              marginLeft: "auto",
            }}
            onClick={() => {
              fetchRandomFact();
            }}
          />
        </span>
        <p>{randomfact.fact}</p>
      </div>
      <div className="ninjamsg">
        <img src="/landingninja.png" alt="" />
        <p>
          Hello! I am Mimo , your Ninja-Assistant ! Check out the middle TV-icon
          for our Knowledge Cubes.
        </p>
      </div>
    </div>
  );
}

export default Home;
