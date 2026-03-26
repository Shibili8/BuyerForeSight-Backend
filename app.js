const express = require("express");
const cors = require("cors");

require("./database/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);


// Root route
app.get("/", (req, res) => {
  res.send("SQLite User API Running 🚀");
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});