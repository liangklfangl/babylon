const MT = require('mark-twain');
const fs = require('fs');
const util = require('util');
const jsonML = MT(fs.readFileSync('code.md').toString());
//we process markdown file to jsonml
// console.log(util.inspect(jsonML,{showHidden:true,depth:4}));
module.exports = jsonML;