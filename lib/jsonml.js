'use strict';

var MT = require('mark-twain');
var fs = require('fs');
var util = require('util');
var jsonML = MT(fs.readFileSync('code.md').toString());
//we process markdown file to jsonml
// console.log(util.inspect(jsonML,{showHidden:true,depth:4}));
module.exports = jsonML;