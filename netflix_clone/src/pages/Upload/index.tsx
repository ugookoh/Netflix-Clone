import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { ClickableDiv, Header, VideoUpload } from "components";
import { useUpload } from "hooks";
import { TailSpin } from "react-loader-spinner";
import { colors } from "values";

const UploadScreen = () => {
  const inputFile = useRef<any>(null);
  const { files, loading, title, dragActive, handleDrag, handleDrop, setFiles, submit, setTitle, setThumbNail } =
    useUpload();

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <Header hideButtons />
        <h1 className={styles.headingText}>Upload a new video</h1>
        <VideoUpload
          files={files}
          inputFile={inputFile}
          dragActive={dragActive}
          setFiles={setFiles}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          setThumbNail={setThumbNail}
        />
        <input
          type={"text"}
          value={title}
          className={styles.titleInput}
          placeholder="Enter a title for your cool new video"
          onChange={(e) => setTitle(e.target.value)}
        />
        <ClickableDiv zoomDisabled className={styles.button} disabled={!files || !title} onPress={submit}>
          {loading ? <TailSpin color={colors.BLACK} height={20} width={20} /> : <p>Upload</p>}
        </ClickableDiv>
      </div>
    </div>
  );
};

export default UploadScreen;
