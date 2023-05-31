import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import multer from "multer";
import { connectDB } from "./db";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import Video from "./models/video";

const PORT = 8080;
const app = express();
const corsOptions = { origin: `*` };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB().then(async () => {
  const connection = mongoose.connection;
  const gfs_media = Grid(connection.db, mongoose.mongo);
  const gfs_photo = Grid(connection.db, mongoose.mongo);
  gfs_media.collection("media");
  gfs_photo.collection("photos");
  const storage = new GridFsStorage({
    db: connection.db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename,
            bucketName: "media",
          };
          return resolve(fileInfo);
        });
      });
    },
  });
  const image_storage = new GridFsStorage({
    db: connection.db,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-${file.originalname}`;
        return filename;
      }
      return {
        bucketName: "photos",
        filename: `${Date.now()}-${file.originalname}`,
      };
    },
  });

  const upload = multer({ storage });
  const upload_image = multer({ storage: image_storage });

  app.post("/upload", upload.single("file"), (req: Request, res) => {
    //@ts-ignore
    res.json(req.file);
  });

  app.post("/uploadImage", upload_image.single("file"), (req, res) => {
    //@ts-ignore
    res.json(req.file);
  });

  app.post("/uploadFileDetails", async (req, res) => {
    const video = new Video(req.body);
    try {
      await video.save();
      res.send(video);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get("/videos", async (req, res) => {
    try {
      const videos = await Video.find({ title: { $regex: req.query?.query || "", $options: "i" } }).sort({
        timestamp: "desc",
      });
      res.json(videos);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get("/getVideo/:id", async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const id = new mongoose.Types.ObjectId(req.params.id);
      const files = await gfs_media.files.find({ _id: id }).toArray();
      if (!files || files.length == 0) throw "File does not exist!";
      const video = files[0];

      const gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "media",
      });

      //@ts-ignore
      const readStream = gridfsBucket.openDownloadStream(video._id);
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Accept-Ranges", "bytes");

      readStream.pipe(res);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });

  app.get("/getPhoto/:id", async (req, res) => {
    try {
      //@ts-ignore
      const id = new mongoose.Types.ObjectId(req.params.id);
      const files = await gfs_photo.files.find({ _id: id }).toArray();
      if (!files || files.length == 0) throw "File does not exist!";
      const gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: "photos",
      });
      //@ts-ignore
      const readStream = gridfsBucket.openDownloadStream(files[0]._id);
      readStream.pipe(res);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });

  app.get("/", (req, res) => {
    res.send("Server is up and running!");
  });
  
  app.use("*", (req, res) => {
    res.status(404).send("Route not found");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
