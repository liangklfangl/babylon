const MT = require('mark-twain');
const fs = require('fs');
const util = require('util');
/**
 * [stringify How to stringify object and array]
 * @param  {[type]} node  [description]
 * @param  {Number} depth [description]
 * @return {[type]}       [description]
 * jsonml, you can see an example ./jsonml.js
 * You can see an util function from github https://github.com/liangklfang/stringify-object
 */
function stringify(node, depth = 0) {
  const indent = '  '.repeat(depth);
  if (Array.isArray(node)) {
    return `[\n` +
      node.map(item => `${indent}  ${stringify(item, depth + 1)}`).join(',\n') +
      `\n${indent}]`;
  }
  if (
    typeof node === 'object' &&
      node !== null &&
      !(node instanceof Date)
  ) {
    return `{\n` +
      Object.keys(node).map((key) => {
        const value = node[key];
        return `${indent}  "${key}": ${stringify(value, depth + 1)}`;
      }).join(',\n') +
      `\n${indent}}`;
  }
  return JSON.stringify(node, null, 2);
}

module.exports = function(source) {
  if(this.cacheable){
    this.cacheable();
  }
  const parsedMarkdown = MT(source);
  //Each loader must return string or Buffer
  return `module.exports = ${stringify(parsedMarkdown)}`;
};

