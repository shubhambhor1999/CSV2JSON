const fs = require("fs");
const path = require("path");

function moveFileToSuccess(filePath) {
  const successDir = path.join(__dirname, "../success");
  if (!fs.existsSync(successDir)) {
    fs.mkdirSync(successDir, { recursive: true });
  }

  const originalFileName = path.basename(filePath);
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 12);
  const newFileName = `${originalFileName.split(".")[0]}_${timestamp}.csv`;

  const newFilePath = path.join(successDir, newFileName);

  fs.renameSync(filePath, newFilePath);

  console.log(`File moved to success folder: ${newFileName}`);
}

module.exports = { moveFileToSuccess };
