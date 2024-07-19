const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, async () => {
  console.log("Server is running on port 5000");
  await sequelize.sync();
  console.log("Database connected");
});
