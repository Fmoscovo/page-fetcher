const request = require("request");
const fs = require("fs");
const readline = require("readline");

const url = process.argv[2];
const filePath = process.argv[3];

if (fs.existsSync(filePath)) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `File '${filePath}' already exists. Do you want to overwrite it? (Y/N) `,
    (answer) => {
      rl.close();
      if (answer.toLowerCase() !== "y") {
        console.log("Operation canceled. File was not overwritten.");
        process.exit();
      } else {
        downloadFile();
      }
    }
  );
} else {
  downloadFile();
}

function downloadFile() {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Invalid URL. Failed to download the resource.");
      process.exit();
    }
    if (response.statusCode !== 200) {
      console.log("Invalid URL. Failed to download the resource.");
      process.exit();
    }

    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.log("Invalid file path. Failed to write the file.");
        process.exit();
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    });
  });
}
