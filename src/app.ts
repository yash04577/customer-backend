import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import path from "path";
import { errorMiddleware } from "./middlewares/errorHandler";

// Importing Routes
import customerRouter from "./routes/customer";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import companyRouter from "./routes/company";
import addressRouter from "./routes/address";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import freightRouter from "./routes/freight";
import wishListRouter from "./routes/wishList";

const app = express();
const server = http.createServer(app);

config({
  path: path.resolve(__dirname, "../.env"),
});

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(morgan("dev"));

app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishListRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/freight", freightRouter);


app.use("/uploads",express.static("uploads"))

app.use(errorMiddleware);
export { server };
export default app;
