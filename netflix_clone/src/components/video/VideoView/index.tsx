import React from "react";
import styles from "./styles.module.scss";
import { BsPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { IVideoViewProps, colors, constants } from "values";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const VideoView = ({
  id,
  videoRef,
  playing,
  showIcon,
  loading,
  setPlaying,
  setLoading,
  toggleShowIcon,
  handleOnTimeUpdate,
}: IVideoViewProps) => {
  return (
    <>
      <video
        controls={false}
        autoPlay={false}
        muted={false}
        className={styles.video}
        ref={videoRef}
        loop={false}
        onTimeUpdate={handleOnTimeUpdate}
        onClick={() => {
          setPlaying((prev) => !prev);
          toggleShowIcon();
        }}
        onLoadedData={() => setLoading(false)}
        onPlay={() => setLoading(false)}
      >
        <source src={`${constants.BASE_URL}/getVideo/${id}`} type="video/mp4"></source>
      </video>
      {loading && <TailSpin color={colors.BLUE} height={60} width={60} wrapperClass={styles.icon} />}
      {showIcon && (
        <div className={styles.icon}>
          {playing ? (
            <BsPlayCircleFill color={colors.WHITE} size={60} />
          ) : (
            <BsFillPauseCircleFill color={colors.WHITE} size={60} />
          )}
        </div>
      )}
    </>
  );
};

export default VideoView;
