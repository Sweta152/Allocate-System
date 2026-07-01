const supabase = require("../../config/db");

async function getVerticalCaseCounts() {
  const { data, error } = await supabase
    .from("vertical_master")
    .select("Title, vertical_TotalCases")
    .order("Title", { ascending: true });

    console.log("DATA:", JSON.stringify(data));  // 👈 add this
  console.log("ERROR:", JSON.stringify(error)); // 👈 add this

  if (error) {
    throw new Error(`Failed to fetch vertical_master: ${error.message}`);
  }

  return data.map((row) => ({
    name: row.Title,
    count: row.vertical_TotalCases,
  }));
}

module.exports = { getVerticalCaseCounts };