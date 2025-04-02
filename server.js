const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = process.env.PORT || 3001;
const uploadRoute = require("./routes/uploadRoute");
const { createTable } = require("./db/index");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());
app.use("/api", uploadRoute);

app.get("/", (req, res) => {
  res.render("index");
});

async function startServer() {
  await createTable();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
