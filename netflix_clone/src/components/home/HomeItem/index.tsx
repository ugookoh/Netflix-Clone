import React from "react";
import styles from "./styles.module.scss";
import { IVideoHomeItem, constants } from "values";
import { useNavigate } from "react-router-dom";

const HomeItem = ({ video }: IVideoHomeItem) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container} onClick={() => navigate(`/video/${video.videoId}?name=${video.title}`)}>
      <img className={styles.img} src={`${constants.BASE_URL}/getPhoto/${video.thumbnailId}`} alt={video.title} />
      <div className={styles.subContainer}>
        <p>{video.title}</p>
      </div>
    </div>
  );
};

export default HomeItem;
