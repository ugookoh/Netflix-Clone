import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { hhmmss } from "utils";
import { TProgressState } from "values";

const useVideo = (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showTools, setShowTools] = useState(true);
  let { id } = useParams();
  const [progress, setProgress] = useState<TProgressState>({
    current: "-",
    end: "-",
    value: 0,
  });

  useEffect(() => {
    let interval: any = null;
    const hasMouseCheck = () => {
      setShowTools(true);
      if (interval) clearInterval(interval);
      interval = setTimeout(() => {
        setShowTools(false);
      }, 2000);
    };
    window.addEventListener("mousemove", hasMouseCheck);
    window.addEventListener("mousedown", hasMouseCheck);
    return () => {
      window.removeEventListener("mousemove", hasMouseCheck);
      window.removeEventListener("mousedown", hasMouseCheck);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const handleVideoProgress = () => {
      const video = videoRef.current;
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };

    videoRef.current.addEventListener("progress", handleVideoProgress);

    return () => {
      // eslint-disable-next-line
      videoRef?.current?.removeEventListener("progress", handleVideoProgress);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (!playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
    // eslint-disable-next-line
  }, [playing]);

  const toggleShowIcon = () => {
    setShowIcon(true);
    setTimeout(() => {
      setShowIcon(false);
    }, 300);
  };

  const handleOnTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress({
      current: hhmmss(videoRef.current.currentTime),
      end: hhmmss(videoRef.current.duration),
      value: (videoRef.current.currentTime / videoRef.current.duration) * 100,
    });
  };

  return {
    id,
    playing,
    showIcon,
    showTools,
    progress,
    loading,
    setLoading,
    setPlaying,
    setProgress,
    toggleShowIcon,
    handleOnTimeUpdate,
  };
};

export default useVideo;
