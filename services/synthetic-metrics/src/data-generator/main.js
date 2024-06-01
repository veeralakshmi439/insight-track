// main.js
const insertRandomRecord = require('./random');

const main = async () => {
  try {
    for (let i = 0; i < 90000; i++) { // Insert 10 random records
      await insertRandomRecord();
    }
    console.log('Records inserted successfully');
  } catch (err) {
    console.error('Error inserting records:', err);
  }
};

main();
