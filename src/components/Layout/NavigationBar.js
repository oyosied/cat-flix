import { useNavigate, NavLink } from "react-router-dom";
import MainCat from "../../images/Main_cat.png";
import classes from "./NavigationBar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const goToMain = () => {
    navigate("/cat-videos");
  };
  return (
    <header>
      <nav className={classes.nav_bar}>
        <img src={MainCat} alt="CatFlix" onClick={goToMain} />

        <ul>
          <li>
            <NavLink
              to="/cat-videos"
              className={(navData) => (navData.isActive ? classes.active : "")}
              end
            >
              Cat Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/top-10"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Top 10
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cat-videos/upload"
              className={(navData) => (navData.isActive ? classes.active : "")}
              end
            >
              Control panel
            </NavLink>
          </li>
        </ul>
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  );
};

export default NavigationBar;
