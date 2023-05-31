import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { dataURItoBlob } from "utils";
import { IVideoUploadProps } from "values";
const VideoUpload = ({
  files,
  inputFile,
  dragActive,
  setFiles,
  handleDrag,
  handleDrop,
  setThumbNail,
}: IVideoUploadProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCaptureThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const aspectRatio = 16 / 9;
    const targetHeight = videoWidth / aspectRatio;
    const targetWidth = videoWidth;
    const x = 0;
    const y = (videoHeight - targetHeight) / 2;
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    canvas.getContext('2d')?.drawImage(video, x, y, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
    const dataURL = canvas.toDataURL();

    const blob = dataURItoBlob(dataURL);
    const fd = new FormData(document.forms[0]);
    fd.append("file", blob);
    setThumbNail(fd);
  };

  return (
    <div
      className={styles.videoView}
      onDragEnter={handleDrag}
      onDrop={handleDrop}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onClick={() => {
        if (!files) inputFile?.current?.click();
      }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <input
        type="file"
        accept=".mp4"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files[0] && files[0].type.includes("mp4")) {
            setFiles(files);
          }
        }}
        style={{ display: "none" }}
        ref={inputFile}
      />
      {files?.[0] ? (
        <video
          controls={true}
          autoPlay={true}
          muted={true}
          className={styles.videoFile}
          ref={videoRef}
          onLoadedData={handleCaptureThumbnail}
        >
          <source src={`${URL.createObjectURL(files[0])}#t=5`} type="video/mp4"></source>
        </video>
      ) : (
        <>
          <img src="upload.png" className={styles.uploadImage} />
          <p>{dragActive ? "Drop .mp4 file here" : "Click or drag your .mp4 file to upload"}</p>{" "}
        </>
      )}
    </div>
  );
};

export default VideoUpload;
