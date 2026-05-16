const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authroutes");

const blogRoutes = require("./routes/blogroutes");

const uploadRoutes = require("./routes/uploadRoutes");




dotenv.config();

connectDB();

const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/upload", uploadRoutes);


app.get("/", (req, res) => {

  res.send("API Running");

});


const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});