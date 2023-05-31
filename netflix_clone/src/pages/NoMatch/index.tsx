import React from "react";
import styles from "./styles.module.scss";

const NoMatchScreen = () => {
  return (
    <div className={styles.container}>
      <h1>Sorry, but this page does not exist 😔</h1>
    </div>
  );
};

export default NoMatchScreen;
