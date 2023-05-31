import React, { useRef } from "react";
import styles from "./styles.module.scss";
import { VideoController, VideoView, ClickableDiv } from "components";
import { colors } from "values";
import { TailSpin } from "react-loader-spinner";
import { BsArrowLeft } from "react-icons/bs";
import { useVideo } from "hooks";
import { useNavigate } from "react-router-dom";

const VideoScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {
    id,
    playing,
    showIcon,
    showTools,
    progress,
    loading,
    setPlaying,
    setLoading,
    setProgress,
    handleOnTimeUpdate,
    toggleShowIcon,
  } = useVideo(videoRef);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {showTools && (
        <ClickableDiv className={styles.backButton} onPress={() => navigate("/")}>
          <BsArrowLeft color={colors.WHITE} size={30} />
        </ClickableDiv>
      )}
      {!id ? (
        <TailSpin color={colors.BLUE} height={60} width={60} />
      ) : (
        <VideoView
          id={id}
          videoRef={videoRef}
          playing={playing}
          loading={loading}
          showIcon={showIcon}
          setPlaying={setPlaying}
          setLoading={setLoading}
          toggleShowIcon={toggleShowIcon}
          handleOnTimeUpdate={handleOnTimeUpdate}
        />
      )}

      {showTools && (
        <VideoController
          videoRef={videoRef}
          progress={progress}
          setProgress={setProgress}
          setLoading={setLoading}
          playing={playing}
          setPlaying={setPlaying}
        />
      )}
    </div>
  );
};

export default VideoScreen;
