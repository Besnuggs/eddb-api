const modulesUrl = "https://eddb.io/archive/v6/modules.json";
const downloadFile = require("./downloadFile");
const refresh = require('./refresh_eddb_files')

const main = () => {
  refresh()
};

main();
