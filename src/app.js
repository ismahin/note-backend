import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./routers/routes.js"
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log("Root endpoint hit");
    res.send("HI");
});
app.use("/api", routes);

export { app }
