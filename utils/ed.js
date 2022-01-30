const rawMaterials = [
  'Carbon',
  'Iron',
  'Lead',
  'Nickel',
  'Phosphorus',
  'Rhenium',
  'Sulphur',
  'Arsenic',
  'Chromium',
  'Germanium',
  'Manganese',
  'Vanadium',
  'Zinc',
  'Zirconium',
  'Boron',
  'Cadmium',
  'Mercury',
  'Molybdenum',
  'Niobium',
  'Tin',
  'Tungsten',
  'Antimony',
  'Polonium',
  'Ruthenium',
  'Selenium',
  'Technetium',
  'Tellurium',
  'Yttrium'
];

const parseParams = (params) => {
  const primaryParamArr = params.match(/"([^"]+)"/g) || [];

  if (primaryParamArr.length === 0) {
    throw Error(
      'No primary arguments were provided for this command. Be sure to encase all primary arguments with double quotation marks (e.g. !ed edsm get-system "Merope" OR !ed edsm get-systems "Merope" "Ngalinn" and etc.).'
    );
  }

  const primaryParams = primaryParamArr.map((param) => param.replace(/^"([^"]*)"$/, '$1'));
  const secondaryParams = params.replace(/(-.+)$/, '$1');

  return { primaryParams, secondaryParams };
};

module.exports = {
  rawMaterials,
  parseParams
};
