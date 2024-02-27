"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./middlewares/errorHandler");
// Importing Routes
const customer_1 = __importDefault(require("./routes/customer"));
const product_1 = __importDefault(require("./routes/product"));
const category_1 = __importDefault(require("./routes/category"));
const company_1 = __importDefault(require("./routes/company"));
const address_1 = __importDefault(require("./routes/address"));
const cart_1 = __importDefault(require("./routes/cart"));
const order_1 = __importDefault(require("./routes/order"));
const freight_1 = __importDefault(require("./routes/freight"));
const wishList_1 = __importDefault(require("./routes/wishList"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.server = server;
(0, dotenv_1.config)({
    path: path_1.default.resolve(__dirname, "../.env"),
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)(process.env.SECRET_KEY));
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1/customer", customer_1.default);
app.use("/api/v1/product", product_1.default);
app.use("/api/v1/category", category_1.default);
app.use("/api/v1/company", company_1.default);
app.use("/api/v1/address", address_1.default);
app.use("/api/v1/cart", cart_1.default);
app.use("/api/v1/wishlist", wishList_1.default);
app.use("/api/v1/order", order_1.default);
app.use("/api/v1/freight", freight_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use(errorHandler_1.errorMiddleware);
exports.default = app;
