"use strict";

const Fs = require("fs");
const Path = require("path");
const Axios = require("axios");

const downloadFile = async ({ fileUrl, folder, outputPath }) => {
  const url = fileUrl;
  const path = Path.resolve(__dirname, folder, outputPath);
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

module.exports = downloadFile;
