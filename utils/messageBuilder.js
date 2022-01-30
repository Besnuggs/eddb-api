const {
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
  hyperlink,
  hideLinkEmbed,
  inlineCode,
  codeBlock,
  time
} = require('@discordjs/builders');
const { AsciiTable3 } = require('ascii-table3');

const headers = ['System', 'Station', 'Mineral', 'Selling Price', 'Buying Price'];

const data = [
  {
    systemName: 'Sol',
    stationName: 'Furukawa Enterprise',
    mineral: 'Platinum',
    sellingPrice: '55,324',
    buyingPrice: '24,455'
  },
  {
    systemName: 'Sol',
    stationName: 'Furukawa Enterprise',
    mineral: 'Platinum',
    sellingPrice: '55,324',
    buyingPrice: '24,455'
  },
  {
    systemName: 'Sol',
    stationName: 'Furukawa Enterprise',
    mineral: 'Platinum',
    sellingPrice: '55,324',
    buyingPrice: '24,455'
  },
  {
    systemName: 'Sol',
    stationName: 'Furukawa Enterprise',
    mineral: 'Platinum',
    sellingPrice: '55,324',
    buyingPrice: '24,455'
  },
  {
    systemName: 'Sol',
    stationName: 'Furukawa Enterprise',
    mineral: 'Platinum',
    sellingPrice: '55,324',
    buyingPrice: '24,455'
  }
];

const tableBuilder = ({ commander, command }) => {
  const title = `Commander ${commander}, your results:`;
  const description = `These are the results for "${command}"`;
  const fields = [];
  const table = new AsciiTable3();
  table.setHeading(...headers);
  for (const obj of data) {
    const { systemName, stationName, mineral, sellingPrice, buyingPrice } = obj;
    table.addRow(systemName, stationName, mineral, sellingPrice, buyingPrice);
  }
  table.removeBorder();
  let stringTable = table.toString();
  return stringTable;
};

module.exports = {
  tableBuilder
};
