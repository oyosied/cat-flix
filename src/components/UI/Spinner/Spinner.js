import classes from "./Spinner.module.css";
import React from "react";

import { useState, useEffect } from "react";
const Spinner = (props) => {
  const [Timer, setTimer] = useState("5");
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevState) => (prevState === "5" ? "1" : "5"));
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [Timer]);

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <img
        style={{ animation: `${classes.spin} ${Timer}s linear infinite` }}
        src={props.img}
        alt="img"
      />
      <h2 style={{ marginTop: "5rem" }}>Loading .....</h2>
    </div>
  );
};

export default Spinner;
