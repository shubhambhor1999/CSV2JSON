async function generateReport(ages) {
  let ageGroups = {
    "< 20": 0,
    "20 to 40": 0,
    "40 to 60": 0,
    "> 60": 0,
  };

  ages.forEach((age) => {
    if (age < 20) ageGroups["< 20"]++;
    else if (age >= 20 && age <= 40) ageGroups["20 to 40"]++;
    else if (age > 40 && age <= 60) ageGroups["40 to 60"]++;
    else ageGroups["> 60"]++;
  });

  const total = ages.length;
  for (let key in ageGroups) {
    ageGroups[key] = ((ageGroups[key] / total) * 100).toFixed(2);
  }

  console.log("Age Distribution:");
  console.table(ageGroups);
  return ageGroups;
}

module.exports = { generateReport };
