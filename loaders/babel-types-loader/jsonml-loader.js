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
  //得到content内容部分~~~
  if (Array.isArray(content)) {
    markdownData.content = content.map(node => {
      //First node is string 'article' while second is an Array
      const tagName = node[0];
      const attr = node[1];
      if (tagName === 'pre' && attr && attr.lang === lang) {
        const code = node[2][1];
        //得到code中的代码部分~~~
        const processedCode = transformer(code, babelConfig, noreact);
        //返回的对象的code属性是已经处理后的demo页码中的代码~~~
        return {
          code: processedCode
        };
      }
      return node;
    });
  }

  return markdownData;
};