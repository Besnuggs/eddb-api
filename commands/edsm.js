const controller = require("../controllers/edsm.js");
const { EDSM_BRADY_API_KEY } = process.env;
const { addSpaceInStationName, spaceInNameRegex } = require("../utils/ed");

module.exports = {
  "server-status": {
    functionName: "getServerStatus",
    function: controller.getServerStatus,
    description: "Fetches the status of the Elite Dangerous API server.",
    parameters: [
      {
        name: "lastUpdate",
        description:
          "Datetime when we last checked the status of the Elite Dangerous server.",
        type: "Datetime",
      },
    ],
    filters: [],
  },
  "get-system": {
    function: (params) => {
      const [systemName] = params;
      return controller.getSystem({ systemName });
    },
    description: "Fetches general information of a system.",
    parameters: [],
    filters: [],
  },
  "get-systems": {
    function: (params) => {
      return controller.getSystems({ systemNames: params });
    },
    description: "Some description",
    parameters: [],
    filters: [],
  },
  "get-system-bodies": {
    function: (params) => {
      const [systemName] = params;
      return controller.getSystemBodies({ systemName });
    },
    description: "Some description",
    parameters: [],
    filters: [],
  },
  "scan-system-values": {
    function: (params) => {
      const [systemName] = params;
      return controller.getScanValuesOfSystem({ systemName });
    },
    description: "Some description",
    parameters: [],
    filters: [],
  },
  "stations-in-system": {
    function: (params) => {
      const [systemName] = params;
      return controller.getStationsInSystem({ systemName });
    },
    description: "Some description",
    parameters: [],
    filters: [],
  },
  "market-in-station": {
    function: async (params) => {
      let [systemName, stationName] = params;
      if (spaceInNameRegex.test(stationName)) {
        stationName = addSpaceInStationName(stationName);
      }
      const systemData = await controller.getStationsInSystem({ systemName });
      const station = systemData.stations.filter(
        (station) => station.name === stationName
      )[0];
      if (!station) {
        throw new Error(`"${stationName}" not found in ${systemName}.`);
      }
      return controller.getMarketInStation({
        marketId: station.marketId,
      });
    },
    description: "some description",
    parameters: [],
    filters: [],
  },
  "shipyard-in-station": {
    function: async (params) => {
      let [systemName, stationName] = params;
      if (spaceInNameRegex.test(stationName)) {
        stationName = stationName.replace(spaceInNameRegex, " ");
      }
      const systemData = await controller.getStationsInSystem({ systemName });
      const station = systemData.stations.filter(
        (station) => station.name === stationName
      )[0];
      if (!station) {
        throw new Error(`"${stationName}" not found in ${systemName}.`);
      }
      return controller.getShipyardInStation({ marketId: station.marketId });
    },
    description: "some description",
    parameters: [],
    filters: [],
  },
  "outfitting-in-station": {
    function: async (params) => {
      let [systemName, stationName] = params;
      if (spaceInNameRegex.test(stationName)) {
        stationName = stationName.replace(spaceInNameRegex, " ");
      }
      const systemData = await controller.getStationsInSystem({ systemName });
      const station = systemData.stations.filter(
        (station) => station.name === stationName
      )[0];
      if (!station) {
        throw new Error(`"${stationName}" not found in ${systemName}.`);
      }
      return controller.getOutfittingInStation({ marketId: station.marketId });
    },
    description: "some description",
    parameters: [],
    filters: [],
  },
  "factions-in-system": {
    function: (params) => {
      const [systemName] = params;
      return controller.getFactionsInSystem({ systemName });
    },
    description: "some description",
    parameters: [],
    filters: [],
  },
  "traffic-in-system": {
    function: (params) => {
      const [systemName] = params;
      return controller.getTrafficInSystem({ systemName });
    },
    description: "some description",
    parameters: [],
    filters: [],
  },
  "deaths-in-system": {
    function: (params) => {
      const [systemName] = params;
      return controller.getDeathsInSystem({ systemName });
    },
    description: "some description",
    parameters: [],
    filters: [],
  },
  "systems-in-sphere": {
    function: (params) => {
      const [systemName] = params;
      return controller.getSystemsInSphere({ systemName });
    },
    description: "some description",
    parameters: [],
    filters: [],
  },
  "systems-in-cube": {
    function: (params) => {
      const [systemName] = params;
      return controller.getSystemsInCube({ systemName });
    },
    description: "some description",
    parameters: [],
    filters: [],
  },
  "commander-rank": {
    function: (params) => {
      const [commanderName] = params;
      return controller.getCommanderRank({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY,
      });
    },
  },
  "commander-cargo": {
    function: (params) => {
      const [commanderName] = params;
      return controller.getCommanderCargo({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY,
      });
    },
  },
  "commander-credits": {
    function: (params) => {
      const [commanderName] = params;
      return controller.getCommanderCredits({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY,
      });
    },
  },
  "commander-position": {
    function: (params) => {
      const [commanderName] = params;
      return controller.getCommanderPosition({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY,
      });
    },
  },
  "commander-logs": {
    function: (params) => {
      const [commanderName] = params;
      return controller.getLogs({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY,
      });
    },
  },
};
