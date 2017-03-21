'use strict';

const transformer = require('./transformer');
/**
 * [exports description]
 * @param  {[type]} markdownData        [Processed jsonml here]
 * @param  {String} options.lang        [description]
 * @param  {[type]} options.babelConfig [description]
 * @param  {[type]} options.noreact     [description]
 * @param  {[type]} options.            [description]
 * @return {[type]}                     [description]
 */
module.exports = function(markdownData, {
  lang = 'react-example',
  babelConfig,
  noreact,
}) {
  const { content } = markdownData;
  if (Array.isArray(content)) {
    markdownData.content = content.map(node => {
      //First node is string 'article' while second is an Array
      const tagName = node[0];
      const attr = node[1];
      if (tagName === 'pre' && attr && attr.lang === lang) {
        const code = node[2][1];
        //We get code here.
        const processedCode = transformer(code, babelConfig, noreact);
        return {
          code: processedCode
        };
      }
      return node;
    });
  }

  return markdownData;
};