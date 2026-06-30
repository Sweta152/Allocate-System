// src/modules/verticals/verticals.controller.js
 
const { getVerticalCaseCounts } = require("./verticals.service");
 
async function getVerticalCaseCountsHandler(req, res) {
  try {
    const data = await getVerticalCaseCounts();
    res.json(data);
  } catch (err) {
  console.error("Full Error:", err);

  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
}
 
module.exports = { getVerticalCaseCountsHandler };