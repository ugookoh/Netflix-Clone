import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { constants } from "values";

const useUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList>();
  const [thumbnail, setThumbNail] = useState<any>();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.includes("mp4")) {
      setFiles(files);
    }
  };

  const submit = async () => {
    try {
      setLoading(true);
      if (files?.length === 0 || !files) {
        setLoading(false);
        return;
      }
      const file = files[0];
      const fd = new FormData();
      fd.append("file", file);
      const res_vid = await axios.post(`${constants.BASE_URL}/upload`, fd);
      const res_thumb = await axios.post(`${constants.BASE_URL}/uploadImage`, thumbnail);
      const videoId = res_vid.data.id;
      const thumbnailId = res_thumb.data.id;
      await axios.post(`${constants.BASE_URL}/uploadFileDetails`, {
        title,
        thumbnailId,
        videoId,
        timestamp: new Date().getTime(),
      });
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      alert(error.message);
    }
  };

  return {
    files,
    title,
    thumbnail,
    loading,
    dragActive,
    handleDrag,
    handleDrop,
    setFiles,
    submit,
    setTitle,
    setThumbNail,
  };
};

export default useUpload;
