import { Link } from "react-router-dom";
import Home from "./Home";

const Header = () => {
  return (
    <header>
      <Link to={'/'} className="headerLeft">ListenLater🎵</Link>
      <Link to={'/search'} className="headerMiddle">+</Link>
      <Link to={'/login'} className="headerRight">Login</Link>
    </header>
  );
};

export default Header;
