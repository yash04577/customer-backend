"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const connectDB_1 = require("./database/connection/connectDB");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({
    path: path_1.default.resolve(__dirname, "../.env"),
});
app_1.server.listen(process.env.PORT, () => {
    (0, connectDB_1.connectDB)();
    console.log(`Server... is running at port ${process.env.PORT} `);
});
