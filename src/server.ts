import app, { server } from "./app";
import { connectDB } from "./database/connection/connectDB";
import { config } from "dotenv";
import path from "path";

config({
  path: path.resolve(__dirname, "../.env"),
});

server.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server... is running at port ${process.env.PORT} `);
});
