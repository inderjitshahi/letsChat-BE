import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import logger from './config/logger.js';
//dotenv config
dotenv.config();

//env variables
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

//exit on mongoose connection error 
mongoose.connection.on("error", (error) => {
  logger.error(`Error connecting to database: ${error}`);
  process.exit(1);
});

//mongodb debug mode
if(process.env.NODE_ENV !== "production"){
  mongoose.set("debug", true);
}

//connect to database
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.info("Database connected");
}).catch((error) => {
  logger.error("Error connecting to database: ", error);
});


let server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.error("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
