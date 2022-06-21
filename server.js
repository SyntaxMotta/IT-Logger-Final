const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");

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

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));

	app.get("*", (_, res) => {
		res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
