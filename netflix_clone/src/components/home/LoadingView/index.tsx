import React from "react";
import HomeLoadingItem from "../HomeLoadingItem";

const LoadingView = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {arr.map((item) => (
        <HomeLoadingItem key={item} />
      ))}
    </>
  );
};

export default LoadingView;
