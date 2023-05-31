import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeLoadingItem = () => {
  return (
    <div className={styles.container}>
      <Skeleton
        width={300}
        height={120}
        baseColor={`rgba(235, 235, 235, 0.1)`}
        highlightColor={`rgba(245, 245, 245, 0.1)`}
        duration={4}
      />
      <Skeleton
        width={300}
        height={40}
        baseColor={`rgba(235, 235, 235, 0.1)`}
        highlightColor={`rgba(245, 245, 245, 0.1)`}
        duration={4}
        style={{ marginTop: 5 }}
      />
    </div>
  );
};

export default HomeLoadingItem;
