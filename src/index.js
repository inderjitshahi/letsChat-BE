import app from "./app.js";
import dotenv from "dotenv";

//dotenv config
dotenv.config();

//env variables
const PORT = process.env.PORT || 8000;

let server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
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
