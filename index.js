const scan = require('./src/scan');

const rules = scan({engineConfig: {rules: {}}});

console.log(JSON.stringify(rules[0]));
