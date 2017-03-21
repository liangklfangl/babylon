const node = require('./jsonml-loader');
const utils = require('util');
const markdownData = getMarkdownData('react-example');
// console.log("markdownData:",utils.inspect(markdownData,{showHidden:true,depth:5}));
//Expected processed code
const processedCode = node(markdownData, {});
console.log("<<<<<<<<<<<<After processing>>>>>>>>>>>>",processedCode);
function getMarkdownData(lang) {
  return {
    content: [
      'article',
      [
        'pre', {
          lang,//if is object, here will be transformed to lang:'react-example'
        }, [
          'code',
          'import { Button } from \'antd\';\n' +
            'ReactDOM.render(\n' +
            '  <div>\n' +
            '    <Button>Default</Button>\n' +
            '  </div>\n' +
            //we only return div and button 
            //In React.createElement, first parameter is tagName while second is attribute
            //and last is child Element. Why we create this is that in babel plugin we 
            //use  presets: ['es2015-ie', 'react', 'stage-0'],
            ', mountNode);',
        ],
      ],
    ],
  };
}
