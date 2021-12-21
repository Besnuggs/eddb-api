const rawMaterials = [
  "Carbon",
  "Iron",
  "Lead",
  "Nickel",
  "Phosphorus",
  "Rhenium",
  "Sulphur",
  "Arsenic",
  "Chromium",
  "Germanium",
  "Manganese",
  "Vanadium",
  "Zinc",
  "Zirconium",
  "Boron",
  "Cadmium",
  "Mercury",
  "Molybdenum",
  "Niobium",
  "Tin",
  "Tungsten",
  "Antimony",
  "Polonium",
  "Ruthenium",
  "Selenium",
  "Technetium",
  "Tellurium",
  "Yttrium",
];

// if chars surrounds '+', it is a space as part of a parameter
const spaceInNameRegex = /([a-zA-Z0-9])(\+)([a-zA-Z0-9])/g;

const addSpaceInName = (stationName) => {
  return stationName.replace(spaceInNameRegex, "$1 $3");
};

module.exports = {
  rawMaterials,
  addSpaceInName,
  spaceInNameRegex,
};
