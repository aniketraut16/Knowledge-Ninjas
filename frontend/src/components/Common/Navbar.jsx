import "./Navbar.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  CircleUserRound,
  House,
  TvMinimalPlay,
  SquareArrowLeft,
} from "lucide-react";
import { useTma } from "../../context/tmaProvider";

function Navbar() {
  const { user } = useTma();

  const navigator = useNavigate();

  const size = 30;
  return (
    <>
      <nav className="upperNavbar">
        <Link>
          <CircleUserRound size={38} />
          {
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          }
        </Link>
      </nav>
      <Outlet />
      <nav className="lowerNavbar">
        <Link to={"/"}>
          <House size={size} />
        </Link>
        <Link to={"/feed"}>
          <TvMinimalPlay size={size} />
        </Link>
        <Link>
          <SquareArrowLeft
            size={size}
            onClick={() => {
              navigator(-1);
            }}
          />
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
