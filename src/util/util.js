function generateRandomId() {
  return getRandomInt(64000);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max - 1)) + 1;
}

export { generateRandomId };
