// https://eddb.io/api - all files and changelog
const fileNames = [
  'systems.csv',
  'systems_recently.csv',
  'systems_populated.json',
  // 'systems_populated.jsonl',
  // 'bodies.json',
  // 'bodies_recently.jsonl',
  'stations.json',
  // 'stations.jsonl',
  'attractions.json',
  // 'attractions.jsonl',
  'factions.json',
  // 'factions.jsonl',
  'factions.csv',
  'listings.csv',
  'commodities.json',
  'modules.json'
]
const baseUrl = 'https://eddb.io/archive/v6/'
const downloadFile = require('./downloadFile')


const main = async () => {
  for (const fileName of fileNames) {
    await downloadFile({ fileUrl: `${baseUrl}${fileName}`, folder: './eddb_files', outputPath: fileName })
  }
}


module.exports = main