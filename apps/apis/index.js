// server.js
const express = require("express");
const cors = require("cors");
const {retrieveRecords,retrieveRecordById} = require("../../services/synthetic-metrics/src/fns/retrieve");
const insertRecord = require("../../services/synthetic-metrics/src/fns/insert");
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser=require('body-parser');

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

app.get("/health", async (req, res) => {
  const { from, to, flow_name} = req.query;

  if (!from) {
    return res
      .status(400)
      .json({ error: "Please provide both from and to timestamps" });
  }

  try {
    const fromTimestamp = new Date(from);
    const toTimestamp = new Date(to || new Date().toISOString());
    const records = await retrieveRecords(fromTimestamp, toTimestamp,flow_name);

    const data = records.map((row, index) => ({
      ...row,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error retrieving records:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/health/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const records = await retrieveRecordById(id);

    const data = records[0];

    res.json(data);
  } catch (err) {
    console.error("Error retrieving records:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/health", async (req,res)=>{
  
  try{
  const body= req.body;
  const records= await insertRecord(body);
  res.status(201).json({});
  }catch(err){
    console.error("Error retrieving records:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
)



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
