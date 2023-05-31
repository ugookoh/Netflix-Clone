import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { ClickableDiv } from "components";
import { BsFillPlayFill } from "react-icons/bs";
import { BiFullscreen, BiPause, BiExitFullscreen } from "react-icons/bi";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { IVideoProps, TProgressState, colors } from "values";
import { hhmmss } from "utils";
import { useSearchParams } from "react-router-dom";

const icon_size = 50;

const VideoController = ({ videoRef, playing, progress, setProgress, setPlaying, setLoading }: IVideoProps) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) document.body.requestFullscreen();
    else document.exitFullscreen();
  };

  const handleVideoProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const manualChange = Number(event.target.value);
    const currentTime = (videoRef.current.duration / 100) * manualChange;
    videoRef.current.currentTime = currentTime;
    setProgress((prev) => {
      if (!videoRef.current) return prev;
      return { ...prev, current: hhmmss(currentTime), value: manualChange };
    });
  };

  const handleVideoForwardOrBackward = (type: "forward" | "backward") => {
    if (!videoRef.current) return;
    let currentTime = videoRef.current.currentTime;
    if (type == "forward") currentTime = Math.min(currentTime + 10, videoRef.current.duration);
    else currentTime = Math.max(currentTime - 10, 0);
    videoRef.current.currentTime = currentTime;
    setProgress((prev) => {
      if (!videoRef.current) return prev;
      return { ...prev, current: hhmmss(currentTime) };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.rangeContainer}>
        <input type="range" min="0" max="100" value={progress.value} onChange={(e) => handleVideoProgress(e)} />
        <p>{`${progress.current} / ${progress.end}`}</p>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.left}>
          <ClickableDiv onPress={() => setPlaying((prev) => !prev)}>
            {playing ? (
              <BiPause size={icon_size} color={colors.WHITE} />
            ) : (
              <BsFillPlayFill size={icon_size} color={colors.WHITE} />
            )}
          </ClickableDiv>
          <ClickableDiv onPress={() => handleVideoForwardOrBackward("backward")}>
            <MdReplay10 size={icon_size} color={colors.WHITE} />
          </ClickableDiv>
          <ClickableDiv onPress={() => handleVideoForwardOrBackward("forward")}>
            <MdForward10 size={icon_size} color={colors.WHITE} />
          </ClickableDiv>
        </div>

        <p className={styles.no_select}>{searchParams.get("name")}</p>

        <ClickableDiv className={styles.right} onPress={toggleFullScreen}>
          {isFullscreen ? (
            <BiExitFullscreen size={icon_size} color={colors.WHITE} />
          ) : (
            <BiFullscreen size={icon_size} color={colors.WHITE} />
          )}
        </ClickableDiv>
      </div>
    </div>
  );
};

export default VideoController;
