const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const host = "0.0.0.0";
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config/config.env" });

// Connect Database
connectDB();

const logs = require("./routes/logs");
const techs = require("./routes/techs");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/logs", logs);
app.use("/api/techs", techs);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/build")));

	app.get("*", (_, res) => {
		res.sendFile(path.join(__dirname, "/client/build/index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.status(200).json({ message: "Welcome to the Support Desk API" });
	});
}

app.listen(PORT, host, function () {
	console.log("Server started.......");
});
