const fs = require("fs");

// Reading File
const readData = fs.readFile("./docs/text1.txt", "utf-8", (err, data) => {
  console.log(err ? err : data);
});

// Writing File
const writeData = fs.writeFile(
  "./docs/text1.txt",
  "Hello from write data",
  (err, data) => {
    console.log("data written");
  }
); // Data inside the text1 file will be replaced with the new data.

// This is not working for some reason. Let me check!!
const writeNewData = fs.writeFile(
  ".docs/text2.txt",
  "Hello from newly created file",
  (err, data) => {
    console.log("file created and data written");
  }
); // Initially, there is no text2 file. So, it will create a new file "text2" and writes the data.

// Creating and Deleting directories
!fs.existsSync("./assets") // If dir not exists, create that dir otherwise del that dir.
  ? fs.mkdir("./assets", (err) => {
      console.log(err ? err : "dir created");
    }) // Creating new dir named "assets".
  : fs.rmdir("./assets", (err) => {
      console.log(err ? err : "dir deleted");
    }); // Deleting the dir named "assets"

// Deleting File
fs.existsSync("./docs/del.txt") &&
  fs.unlink("./docs/del.txt", (err) => {
    console.log(err ? err : "file deleted");
  });
