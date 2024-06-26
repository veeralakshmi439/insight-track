const {
  retrieveRecordById,
} = require("../fns/retrieve");
const insertRecord = require("../fns/insert");
const dynamicRandom = require("../data-generator/dynamic-random");

const router = require("express").Router();

router.get("/health", async (req, res) => {
  const { from, to, flow_name } = req.query;

  if (!from) {
    return res
      .status(400)
      .json({ error: "Please provide both from and to timestamps" });
  }

  try {
    const fromTimestamp = new Date(from);
    const toTimestamp = new Date(to || new Date().toISOString());
    const records = await dynamicRandom(fromTimestamp, toTimestamp);

    const data = records.map((row, index) => ({
      ...row,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error retrieving records:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/health/:id", async (req, res) => {
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

router.post("/health", async (req, res) => {
  try {
    const body = req.body;
    const records = await insertRecord(body);
    res.status(201).json({});
  } catch (err) {
    console.error("Error retrieving records:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
