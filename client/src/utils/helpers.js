// client/src/utils/helpers.js

const USER_COLORS = [
  '#30bced',
  '#6eeb83',
  '#ffbc42',
  '#ecd444',
  '#ee6352',
  '#9ac2c9',
  '#8acb88',
  '#15d2d3',
];

const USER_NAMES = [
  'Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Katherine Johnson',
  'Radia Perlman', 'Hedy Lamarr', 'Sister Mary Keller', 'Joan Clarke'
];

// Simple function to pick a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Function to get a random user object
export const getRandomUser = () => ({
  name: getRandomItem(USER_NAMES),
  color: getRandomItem(USER_COLORS),
});