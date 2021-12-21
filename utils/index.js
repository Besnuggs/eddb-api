"use strict";

require("dotenv").config();
const Fs = require("fs");
const Path = require("path");
const Axios = require("axios");
const { EDDB_BASE_FILE_URL } = process.env;

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

const getAllEddbFiles = async () => {
  const fileNames = [
    "systems.csv",
    "systems_recently.csv",
    "systems_populated.json",
    // 'systems_populated.jsonl',
    // 'bodies.json',
    // 'bodies_recently.jsonl',
    "stations.json",
    // 'stations.jsonl',
    "attractions.json",
    // 'attractions.jsonl',
    "factions.json",
    // 'factions.jsonl',
    "factions.csv",
    "listings.csv",
    "commodities.json",
    "modules.json",
  ];
  const baseUrl = EDDB_BASE_URL;

  for (const fileName of fileNames) {
    await downloadFile({
      fileUrl: `${baseUrl}/${fileName}`,
      folder: "./eddb_files",
      outputPath: fileName,
    });
  }
};

module.exports = { downloadFile, getAllEddbFiles };
