import { useEffect, useState } from "react";
import "./AllGames.css";
import { Link, useParams } from "react-router-dom";

function AllGamesTemplate() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const domainDetails = {
    geography: {
      name: "Geography",
      img: "/geodomain.png",
      sideimg: "/landingninja.png",
      sidetext: [
        "I like hopping ninjas from country to country! ",
        "Now Choose the Game-Mode to Play!",
      ],
      gameList: [
        {
          name: "Guess by Map",
          ref: "#",
          img: "/guessbymap.png",
        },
        {
          name: "Guess by Flag",
          ref: "#",
          img: "/guessbyflag.png",
        },
      ],
    },
    tech: {
      name: "Technology",
      img: "/techdomain.png",
      sideimg: "/landingninja.png",
      sidetext: [
        "A Techno-Savvy Ninja !!",
        "I would love to see how brainiac you are!",
      ],
      gameList: [
        {
          name: "Quiz on Technology",
          ref: "#",
          img: "/techgame.png",
        },
        {
          name: "Learn About Blockchain",
          ref: "#",
          img: "/learnblockchain.png",
        },
      ],
    },
    gk: {
      name: "General Knowledge",
      img: "/gkdomain.png",
      sideimg: "/landingninja.png",
      sidetext: ["Lets See! What is your IQ level."],
      gameList: [
        {
          name: "Quiz on General Knowledge",
          ref: "#",
          img: "/gkgame.png",
        },
      ],
    },
  };
  const { domain } = useParams();

  useEffect(() => {
    if (domainDetails[domain]) {
      setSelectedDomain(domainDetails[domain]);
    }
  }, [domain]);

  if (!selectedDomain) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AllGames">
      <div className="domain-intro">
        <img src={selectedDomain.img} alt={selectedDomain.name} />
        <h2>{selectedDomain.name}</h2>
      </div>
      <div className="line"></div>
      <div className="domain-details">
        <img src={selectedDomain.sideimg} alt={selectedDomain.name} />
        <span>
          {selectedDomain.sidetext.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </span>
      </div>
      <div className="gamesList">
        {selectedDomain.gameList.map((game, index) => (
          <Link to={game.ref} key={index}>
            <img src={game.img} alt={game.name} />
            <p>{game.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllGamesTemplate;
