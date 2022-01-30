const {
  EDSM_BASE_API_ENDPOINT,
  EDSM_SERVER_API_STATUS_URL,
  EDSM_BASE_API_SYSTEM_ENDPOINT,
  EDSM_COMMANDER_API_URL,
  EDSM_LOGS_API_URL
} = process.env;
const Axios = require('axios');
const { reformatNameForEDSM } = require('../utils/edsm');

// https://www.edsm.net/en/nightly-dumps - nightly dumped files
// Be sure to reformat systemNames and stationNames for EDSM!

module.exports = {
  getSystem: async ({ systemName }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_ENDPOINT}/system?systemName=${reformatNameForEDSM(
        systemName
      )}&&showId=1&&showCoordinates=1&&showPermit=1&&showInformation=1&&showPrimaryStar=1&&includeHidden=1`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getSystems: async ({ systemNames }) => {
    const reformattedSystemNames = systemNames.map((systemName) => reformatNameForEDSM(systemName));
    const firstSystemName = reformattedSystemNames.shift();
    let systemUriComponent = `systemName[]=${firstSystemName}`;
    for (const system of reformattedSystemNames) {
      systemUriComponent += `&systemName[]=${system}`;
    }
    const response = await Axios({
      url: `${EDSM_BASE_API_ENDPOINT}/systems?${systemUriComponent}&&showId=1&&showCoordinates=1&&showPermit=1&&showInformation=1&&showPrimaryStar=1&&includeHidden=1`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getSystemBodies: async ({ systemName }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/bodies?systemName=${reformatNameForEDSM(systemName)}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getScanValuesOfSystem: async ({ systemName, systemId }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/estimated-value?systemName=${reformatNameForEDSM(systemName)}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getStationsInSystem: async ({ systemName }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/stations?systemName=${reformatNameForEDSM(systemName)}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getMarketInStation: async ({ marketId }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/stations/market?marketId=${marketId}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getShipyardInStation: async ({ marketId }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/stations/shipyard?marketId=${marketId}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getOutfittingInStation: async ({ marketId, systemName }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/stations/outfitting?marketId=${marketId}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getFactionsInSystem: async ({ systemName }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/factions?systemName=${reformatNameForEDSM(systemName)}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getTrafficInSystem: async ({ systemName }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/traffic?systemName=${reformatNameForEDSM(systemName)}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getDeathsInSystem: async ({ systemName }) => {
    const response = await Axios({
      url: `${EDSM_BASE_API_SYSTEM_ENDPOINT}/deaths?systemName=${reformatNameForEDSM(systemName)}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getSystemsInSphere: async ({ systemName, coordinates }) => {
    let uriComponent = `systemName=${reformatNameForEDSM(systemName)}`;
    if (coordinates) {
      uriComponent = `x=${coordinates.x}?y=${coordinates.y}?z=${coordinates.z}`;
    }
    const response = await Axios({
      url: `${EDSM_BASE_API_ENDPOINT}/sphere-systems?${uriComponent}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getSystemsInCube: async ({ systemName, coordinates }) => {
    let uriComponent = `systemName=${reformatNameForEDSM(systemName)}`;
    if (coordinates) {
      uriComponent = `x=${coordinates.x}?y=${coordinates.y}?z=${coordinates.z}`;
    }
    const response = await Axios({
      url: `${EDSM_BASE_API_ENDPOINT}/cube-systems?${uriComponent}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getServerStatus: async () => {
    const response = await Axios({
      url: EDSM_SERVER_API_STATUS_URL,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getCommanderRank: async ({ commanderName, apiKey }) => {
    const response = await Axios({
      url: `${EDSM_COMMANDER_API_URL}/get-ranks/apiKey/${apiKey}/commanderName/${commanderName}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getCommanderCredits: async ({ commanderName, apiKey }) => {
    const response = await Axios({
      url: `${EDSM_COMMANDER_API_URL}/get-credits/apiKey/${apiKey}/commanderName/${commanderName}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getCommanderCargo: async ({ commanderName, apiKey }) => {
    const response = await Axios({
      url: `${EDSM_COMMANDER_API_URL}/get-materials/apiKey/${apiKey}/commanderName/${commanderName}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getLogs: async ({ commanderName, apiKey }) => {
    // This endpoint is subject to rate limit. Each user can query the endpoint 360 times every hour, which is around 1 request every 10 seconds.
    const response = await Axios({
      url: `${EDSM_LOGS_API_URL}/get-logs/apiKey/${apiKey}/commanderName/${commanderName}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getCommanderPosition: async ({ commanderName, apiKey }) => {
    const response = await Axios({
      url: `${EDSM_LOGS_API_URL}/get-position/apiKey/${apiKey}/commanderName/${commanderName}/showCoordinates/1`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  setComment: async ({ commanderName, apiKey, systemName, comment }) => {
    if (!commanderName || !systemName || !comment || !apiKey) {
      throw new Error('Something fucked up. Check your shit.');
    }
    const response = await Axios({
      url: `${EDSM_LOGS_API_URL}/set-comment/apiKey/${apiKey}/commanderName/${commanderName}/comment/${comment}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getComment: async ({ commanderName, systemName, apiKey }) => {
    const response = await Axios({
      url: `${EDSM_LOGS_API_URL}/get-comment/apiKey/${apiKey}/commanderName/${commanderName}/systemName/${reformatNameForEDSM(
        systemName
      )}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  },
  getComments: async ({ commanderName, systemName, apiKey }) => {
    const response = await Axios({
      url: `${EDSM_LOGS_API_URL}/get-comments/apiKey/${apiKey}/commanderName/${commanderName}/systemName/${reformatNameForEDSM(
        systemName
      )}`,
      method: 'GET'
    });
    const { data } = response;
    return data;
  }
};
