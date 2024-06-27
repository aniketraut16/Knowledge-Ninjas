import { Link } from "react-router-dom";
import "./Home.css";
import { CircleHelp, Clock, RefreshCcw } from "lucide-react";

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
  const Knowledge = [
    {
      _id: "667b17a22b49d9acf21ed9ad",
      fact: "A bolt of lightning contains enough energy to toast 100,000 slices of bread.",
      category: "Weather",
    },
  ];
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
        <p>{Knowledge[0].fact}</p>
      </div>
      <div className="fotdCard">
        <span>
          <CircleHelp />
          Do You Know that?
          <RefreshCcw
            style={{
              marginLeft: "auto",
            }}
          />
        </span>
        <p>{Knowledge[0].fact}</p>
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
