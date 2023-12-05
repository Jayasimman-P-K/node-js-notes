const fs = require("fs");

const readStream = fs.createReadStream("./docs/text1.txt", {
  encoding: "utf-8",
});
const writeStream = fs.createWriteStream("./docs/text2.txt");

// This is how we read data from readStream
readStream.on("data", (chunk) => {
  // chunk is the data read using readStream
  writeStream.write("========= New Chunk ========");
  writeStream.write(chunk); // Now we pass that chunk into writeStream
});

// We can also do Piping as well, which works same as the above code.

// Piping => When we have to do both the process at the same time.
readStream.pipe(writeStream);
