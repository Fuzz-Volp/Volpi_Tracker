import express from "express";
import ViteExpress from "vite-express";
import logging from "./config/logging";
import config from "./config/config";
import { connectDB } from "./config/db";
import checkToken from "./middleware/checkToken";
import ensureLoggedIn from "./middleware/ensureLoggedIn";
import user from "./routes/api/user";
import bodyParser from "body-parser";

const app = express();

connectDB();

/** Config */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.data = {};
  next();
});

// Check Token
app.use(checkToken);

/** Route */
app.use("/api/users", user);

// API Route
app.get("/api", (_, res) => {
  res.json({ message: "The API is alive!!" });
});

ViteExpress.listen(app, 3001, () =>
  logging.info(
    `Server is running at ${config.server.host}:${config.server.port} ...`
  )
);
