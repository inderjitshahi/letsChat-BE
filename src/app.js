import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import fileUpload from "express-fileupload";

//initialize express app
const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

//routes
app.get("/", (req, res) => {
  res.send("Hello From Express server!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

export default app;
