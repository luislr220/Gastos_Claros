const express = require("express");
const cors = require("cors");
const app = express();
const gastoRoutes = require("./src/routes/gastosRoutes");
const port = 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});

app.use("/api/gastos", gastoRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
