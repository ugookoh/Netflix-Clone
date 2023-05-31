import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnailId: {
    type: String,
  },
  videoId: {
    type: String,
  },
  timestamp: {
    type: Number,
  },
});

const Video = mongoose.model("Video", VideoSchema);

export default Video;
