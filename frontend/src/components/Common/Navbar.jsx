import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";
import {
  CircleUserRound,
  House,
  TvMinimalPlay,
  SquareArrowLeft,
} from "lucide-react";
import { useTma } from "../../context/tmaProvider";

function Navbar() {
  const { user } = useTma();

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
        <Link>
          <House size={size} />
        </Link>
        <Link>
          <TvMinimalPlay size={size} />
        </Link>
        <Link>
          <SquareArrowLeft size={size} />
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
