# Node JS Totorial NetNinja

## Chapter 1 : Intro

- CommonJS module is used instead of ES6 Module
  <img src="./assets/computers-and-code.png" alt="" style="margin-top: 1rem">

## Chapter 2 : Node.js Basics

- #### Getting Directory and File path

  ```js
  console.log(__dirname); // path to the current directory
  console.log(__filename); // path to the current file
  ```

- #### Import and Export in NodeJs (CommonJS)

  ```js
  // peoples.js => fileName
  const names = ["Jayasi", "Modi", "Musk", "mark"];
  const age = ["25", "65", "45", "35"];
  module.exports = { names, age }; // export syntax

  // module.js => fileName
  const { names, age } = require("./peoples"); // import syntax
  console.log(names, age);

  // output
  ["Jayasi", "Modi", "Musk", "mark"][("25", "65", "45", "35")];
  ```

- #### **_os_** module in NodeJs

  ```js
  const os = require("os");
  console.log(os.homedir());
  console.log(os.platform());

  // output
  C:\Users\HP
  win32
  ```

- #### The File System => **_fs_** module

  ```js
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
  ```

- #### Streams and Buffers

  **1. Stream:**

  - **What is it?** A Stream is a continuous flow of data. In Node.js, it's a way of handling reading from or writing to a source in a sequential manner, rather than loading the entire data into memory.
  - **Why use it?** Streams are efficient because they allow you to work with chunks of data, piece by piece, instead of loading everything at once. This is particularly useful when dealing with large files or real-time data.

  **Types of Streams:**

  - **Readable Streams:** Used for reading data (e.g., reading a file).
  - **Writable Streams:** Used for writing data (e.g., writing to a file).
  - **Duplex Streams:** Supports both reading and writing.
  - **Transform Streams:** Duplex streams that can modify or transform the data as it's written or read.

  **Example:**

  ```javascript
  const fs = require("fs");
  const readStream = fs.createReadStream("example.txt");
  readStream.on("data", (chunk) => {
    console.log(chunk);
  });
  ```

  **2. Buffer:**

  - **What is it?** A Buffer is a temporary storage area in memory that allows Node.js to handle binary data directly.
  - **Why use it?** When working with streams or reading from files, data is often processed in chunks. Buffers provide a way to deal with these chunks of binary data efficiently using **FIFO** system.

  **Example:**

  ```javascript
  const buffer = Buffer.from("Hello, Jayasimman!", "utf-8");
  console.log(buffer.toString()); // Outputs: Hello, Jayasimman!
  ```

  - In summary, Streams help in handling data in a sequential manner, while Buffers provide a mechanism for dealing with binary data efficiently.

  - [Click here](https://medium.com/@diego.coder/buffers-and-streams-in-node-js-8cf094621dd9) to read more about streams and buffers.

  <img src="/assets/stream-and-buffer.png" alt="Alt text" title="streaming and buffer" style="margin-top: 1rem">
