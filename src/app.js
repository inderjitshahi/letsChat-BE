import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import fileUpload from "express-fileupload";
import createHttpError from "http-errors";
import router from "./routes/index.js";
//initialize express app
const app = express();

//-------------------------------------- MIDDLEWARES --------------------------------------//
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

//-------------------------------------- ROUTES -------------------------------------------//

//api v1 routes
app.use("/api/v1/", router);


//-------------------------------------- NOT FOUND ROUTE -----------------------------------//
app.use((req, res, next) => {
  next(createHttpError.NotFound('This route does not exist'));
});


//-------------------------------------- ERROR HANDLING -----------------------------------//
app.use(async (err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
})

export default app;
