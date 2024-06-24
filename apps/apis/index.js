// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser=require('body-parser');
const router = rquire('../../services/synthetic-metrics/src/rest-routs');

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(bodyParser.json());

app.use('/api',router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
