# Node JS Totorial NetNinja

## Chapter 1 : Intro

- CommonJS module is used instead of ES6 Module

![computers-and-code](https://github.com/Jayasimman-P-K/node-js-notes/assets/92907116/c415f6c2-7a42-475e-9487-8b1f2f4d39fe)

## Chapter 2 : Node.js Basics

- #### Getting Directory and File path

  ```js
  console.log(__dirname); // dir path
  console.log(__filename); // file path
  ```

- #### Import and Export in NodeJs (CommonJS)

  ```js
  // peoples.js : fileName
  const names = ["Jayasi", "Modi", "Musk", "mark"];
  const age = ["25", "65", "45", "35"];
  module.exports.person = ["human", "human", "alien", "human"] // named export
  module.exports = { names, age }; // default export syntax

  // module.js : fileName
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

- #### The File System : **_fs_** module

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
  );

  // This is not working for some reason. Update is req!!
  const writeNewData = fs.writeFile(
    ".docs/text2.txt",
    "Hello from newly created file",
    (err, data) => {
      console.log("file created and data written");
    }
  );

  // Creating and Deleting directories
  !fs.existsSync("./assets")
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

  ![stream-and-buffer](https://github.com/Jayasimman-P-K/node-js-notes/assets/92907116/92a9ef9b-5238-4bfb-8ec3-18f03791fe37)

  **Example code for buffer and streams:**

  ```javascript
  const fs = require("fs");

  const readStream = fs.createReadStream("./docs/text1.txt", {
    encoding: "utf-8",
  });
  const writeStream = fs.createWriteStream("./docs/text2.txt");

  // Method 1
  readStream.on("data", (chunk) => {
    writeStream.write(chunk);
  });

  // Method 2 : Piping
  readStream.pipe(writeStream);
  ```

## Chapter 3 & 4 : Clients & Servers

- Creating a server using vanilla nodejs.

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader("content-type", "text/html");

  // routing
  let path = "./public/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about"); // redirects
      res.end();
      break;
    default:
      path += "error.html";
      res.statusCode = 404;
      break;
  }

  // send an response
  fs.readFile(path, (err, data) => {
    err
      ? (console.log(err),
        // end the response
        res.end())
      : (res.write(data),
        // end the response
        res.end());
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for the request on port 3000");
});
```

- #### Request & Responses
  - **Status Code:** describes the type of response sent to the browser.
  - **Status Codes:**
    - 100 range - informational responses
    - 200 range - success codes. _eg_: 200 - ok
    - 300 range - codes for redirects. _eg_: 301 - moved permanently
    - 400 range - client side error codes. _eg_: 404 - not found
    - 500 range - server side error codes. _eg_: 500 - internal server error

## Chapter 5 : NPM

- [Click here](https://kinsta.com/knowledgebase/what-is-npm/) to read more about **npm**.

## Chapter 6 : ExpressJS

- Creating a server in node.js with express.js.

```js
const express = require("express");

// initiate express app
const app = express();

// listen for requests
app.listen(3000);

// get responses
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

// redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/error.html");
});
```

## Chapter 7 : View Engines

![Screenshot (71)](https://github.com/Jayasimman-P-K/node-js-notes/assets/92907116/02d3e2ec-b794-4a5b-961c-69a6bb3ad2ce)

## Chapter 8 : Middlewares

## Chapter 9 : MongoDB

## Chapter 10 : Get, Post, Put & Delete

- ### Request types:

  - **GET** requests to get a resource
  - **POST** requests to create a new data
  - **DELETE** requests to delete data
  - **PUT** requests to updata data

- ### Route Paramenters

  - part of the routes that are variable, that can be changed dynamically

  ```console
  localhost:3000/blogs/:id
  ```

## Chapter 11 : Express Router & MVC

- **MVC** - **M**odel, **V**iew, **C**ontroller
- MVC is a way for structuring our code and files
- It keeps code more modular, reusable and easy to use

## End : Wrap up
