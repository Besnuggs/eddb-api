const controller = require('../controllers/edsm.js');
const { EDSM_BRADY_API_KEY } = process.env;
const { parseParams } = require('../utils/ed');

module.exports = {
  'server-status': {
    functionName: 'getServerStatus',
    function: controller.getServerStatus,
    description: 'Fetches the status of the Elite Dangerous API server.',
    parameters: [
      {
        name: 'lastUpdate',
        description: 'Datetime when we last checked the status of the Elite Dangerous server.',
        type: 'Datetime'
      }
    ],
    filters: []
  },
  'get-system': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getSystem({ systemName });
    },
    description: 'Fetches general information of a system.',
    parameters: [],
    filters: []
  },
  'get-systems': {
    function: (params) => {
      let { primaryParams, secondaryParams } = parseParams(params);
      return controller.getSystems({ systemNames: primaryParams });
    },
    description: 'Some description',
    parameters: [],
    filters: []
  },
  'get-system-bodies': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getSystemBodies({ systemName });
    },
    description: 'Some description',
    parameters: [],
    filters: []
  },
  'scan-system-values': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getScanValuesOfSystem({ systemName });
    },
    description: 'Some description',
    parameters: [],
    filters: []
  },
  'stations-in-system': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getStationsInSystem({ systemName });
    },
    description: 'Some description',
    parameters: [],
    filters: []
  },
  'market-in-station': {
    function: async (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName, stationName] = primaryParams;
      const systemData = await controller.getStationsInSystem({ systemName });
      const station = systemData.stations.filter((station) => station.name === stationName)[0];
      if (!station) {
        throw new Error(`"${stationName}" not found in ${systemName}.`);
      }
      return controller.getMarketInStation({
        marketId: station.marketId
      });
    },
    description: 'some description',
    parameters: [],
    filters: []
  },
  'shipyard-in-station': {
    function: async (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName, stationName] = primaryParams;
      const systemData = await controller.getStationsInSystem({ systemName });
      const station = systemData.stations.filter((station) => station.name === stationName)[0];
      if (!station) {
        throw new Error(`"${stationName}" not found in ${systemName}.`);
      }
      return controller.getShipyardInStation({ marketId: station.marketId });
    },
    description: 'some description',
    parameters: [],
    filters: []
  },
  'outfitting-in-station': {
    function: async (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName, stationName] = primaryParams;
      const systemData = await controller.getStationsInSystem({ systemName });
      const station = systemData.stations.filter((station) => station.name === stationName)[0];
      if (!station) {
        throw new Error(`"${stationName}" not found in ${systemName}.`);
      }
      return controller.getOutfittingInStation({ marketId: station.marketId });
    },
    description: 'some description',
    parameters: [],
    filters: []
  },
  'factions-in-system': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getFactionsInSystem({ systemName });
    },
    description: 'some description',
    parameters: [],
    filters: []
  },
  'traffic-in-system': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getTrafficInSystem({ systemName });
    },
    description: 'some description',
    parameters: [],
    filters: []
  },
  'deaths-in-system': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getDeathsInSystem({ systemName });
    },
    description: 'some description',
    parameters: [],
    filters: []
  },
  'systems-in-sphere': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getSystemsInSphere({ systemName });
    },
    description: 'some description',
    parameters: [],
    filters: []
  },
  'systems-in-cube': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [systemName] = primaryParams;
      return controller.getSystemsInCube({ systemName });
    },
    description: 'some description',
    parameters: [],
    filters: []
  },
  'commander-rank': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [commanderName] = primaryParams;
      return controller.getCommanderRank({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY
      });
    }
  },
  'commander-cargo': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [commanderName] = primaryParams;
      return controller.getCommanderCargo({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY
      });
    }
  },
  'commander-credits': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [commanderName] = primaryParams;
      return controller.getCommanderCredits({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY
      });
    }
  },
  'commander-position': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [commanderName] = primaryParams;
      return controller.getCommanderPosition({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY
      });
    }
  },
  'commander-logs': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [commanderName] = primaryParams;
      return controller.getLogs({
        commanderName,
        apiKey: EDSM_BRADY_API_KEY
      });
    }
  },
  'commander-comment': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [commanderName, systemName] = primaryParams;
      return controller.getComment({
        systemName,
        commanderName,
        apiKey: EDSM_BRADY_API_KEY
      });
    }
  },
  'commander-comments': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [commanderName, systemName] = primaryParams;
      return controller.getComments({
        systemName,
        commanderName,
        apiKey: EDSM_BRADY_API_KEY
      });
    }
  },
  'commander-set-comment-in-system': {
    function: (params) => {
      const { primaryParams, secondaryParams } = parseParams(params);
      const [commanderName, systemName, comment] = primaryParams;
      return controller.setComment({
        systemName,
        commanderName,
        comment,
        apiKey
      });
    }
  }
};
