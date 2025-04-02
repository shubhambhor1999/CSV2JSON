const { pool } = require("./index");

async function insertUsers(users) {
  const queries = users.map((user) => {
    const { name, age, ...additionalFields } = user;
    if (!name || !name.firstName || !name.lastName || !age) return null;

    const fullName = `${name.firstName} ${name.lastName}`;
    const { address = {}, ...additionalInfo } = additionalFields;

    return pool.query(
      `INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)`,
      [fullName, age, JSON.stringify(address), JSON.stringify(additionalInfo)]
    );
  });

  await Promise.all(queries.filter((q) => q));
  console.log("CSV Data inserted successfully.");
}

async function getAgeDistribution() {
  const result = await pool.query(`SELECT age FROM users`);
  return result.rows.map((row) => row.age);
}

module.exports = { insertUsers, getAgeDistribution };
