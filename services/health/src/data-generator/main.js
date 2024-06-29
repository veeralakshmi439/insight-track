// main.js
const insertRandomRecord = require('./random');

const main = async () => {
  try {
      await insertRandomRecord();
    console.log('Records inserted successfully');
  } catch (err) {
    console.error('Error inserting records:', err);
  }
};

main();
