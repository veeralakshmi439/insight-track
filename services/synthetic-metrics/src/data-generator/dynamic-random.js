function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const randomDistrubution = [
  "up",
  "up",
  "up",
  "up",
  "up",
  "up",
  "up",
  "up",
  "down",
  "up",
  "up",
  "up",
  "up",
  "up",
  "up",
  "up",
  "up",
  "up",
  "up",
  "partially down",
];

function generateRandomData(
  fromDate,
  toDate,
  numberOfFlows = 10,
  totalPeriods = 48
) {
  const data = [];

  const startTime = new Date(fromDate);
  const endTime = new Date(toDate);

  // Calculate interval between timestamps
  const totalMilliseconds = endTime.getTime() - startTime.getTime();
  const intervalMilliseconds = totalMilliseconds / totalPeriods;

  // Function to generate records for a single flow with timestamps
  function generateFlowData(flowIndex, fromDate, toDate) {
    const flowName = `Flow_${flowIndex}`;

    let currentTime = new Date(fromDate);

    for (let i = 0; i < totalPeriods; i++) {
      const id = generateUUID();
      const scan_id = generateUUID();
      const sequence_number = data.length + 1; // Sequence number for the current entry
      const timestamp = currentTime.toISOString();
      const start_uri = `http://example.com/start/${scan_id}`;
      const end_uri = `http://example.com/end/${scan_id}`;
      const screenshot_id = generateUUID();
      const flow_name = flowName;
      const status = randomDistrubution[Math.round(Math.random()*10)];

      const entry = {
        id,
        scan_id,
        sequence_number,
        timestamp,
        start_uri,
        end_uri,
        screenshot_id,
        flow_name,
        status,
      };

      data.push(entry);

      // Move to the next interval
      currentTime.setTime(currentTime.getTime() + intervalMilliseconds);
    }
  }

  // Generate data for each flow
  for (let i = 0; i < numberOfFlows; i++) {
    generateFlowData(i + 1, fromDate, toDate);
  }

  return data;
}

module.exports = generateRandomData;
