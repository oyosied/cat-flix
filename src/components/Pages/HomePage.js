import React from "react";
import classes from "./HomePage.module.css";
import homePagePic from "../../images/cat-ga7d523fc2_1280 1.png";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <React.Fragment>
      <header>
        <nav className={classes.nav_bar}>
          <div>
            <p className={`${classes.nav_bar} ${classes.logo}`}>CATFLIX</p>
            <button onClick={goToLogin}>Login</button>
            <button onClick={goToLogin}>Register</button>
          </div>
        </nav>
      </header>
      <main className={classes.main}>
        <div>
          <p className={classes.main_title}>CATFLIX</p>
          <p>Cat videos for every occasion.</p>
          <p>Want to upload your own videos?</p>
          <p>Create a producer account</p>
        </div>

        <img alt="cat-flix home page" src={homePagePic} />
      </main>
    </React.Fragment>
  );
};
export default HomePage;
