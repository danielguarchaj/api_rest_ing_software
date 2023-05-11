const express = require("express");
const app = express();

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

require("./app/routes/student.routes.js")(app);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
