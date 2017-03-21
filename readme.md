### 1.目的已经实现

#### 1.1 直接转化方法

第一步：cd babylon/babel-types-loader

第二步：node index

第三步:观察

输入的内容为:

```js
 [
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
      ]
  ]
```

输出结果为:

```js
{ content:
   [ 'article',
     { code: 'function preview() {\n  var React = require("react");\n\n  var Rea
ctDOM = require("react-dom");\n\n  var _antd = require("antd");\n\n  return Reac
t.createElement(\n    "div",\n    null,\n    React.createElement(\n      _antd.B
utton,\n      null,\n      "Default"\n    )\n  );\n}' } ] }
```
因为我们的babel被添加了如下插件，所以上面的代码都会被转化为React.createElement.

#### 1.2 loader的方法

首先请确保全局安装了wcf。

在根目录下输入: wcf --dev --devServer --config ./webpack.config.js

查看控制台，我们的markdown-data已经被解析出来了。

输入内容为:

````jsx
import { Button } from 'antd';
ReactDOM.render(
  <div>
    <Button type="primary" shape="circle" icon="search" />
    <Button type="primary" icon="search">Search</Button>
    <Button shape="circle" icon="search" />
    <Button icon="search">Search</Button>
    <br />
    <Button type="ghost" shape="circle" icon="search" />
    <Button type="ghost" icon="search">Search</Button>
    <Button type="dashed" shape="circle" icon="search" />
    <Button type="dashed" icon="search">Search</Button>
  </div>,
  mountNode
);
````

输出内容为：

```js
const React =  require('react');
const ReactDOM = require('react-dom');
import { Button } from 'antd';module.exports = {
  "content": ["article", ["h3", "1.mark-twain解析出来的无法解析成为ast"], function jsonmlReactLoader() {
    return <div>
    <Button type="primary" shape="circle" icon="search" />
    <Button type="primary" icon="search">Search</Button>
    <Button shape="circle" icon="search" />
    <Button icon="search">Search</Button>
    <br />
    <Button type="ghost" shape="circle" icon="search" />
    <Button type="ghost" icon="search">Search</Button>
    <Button type="dashed" shape="circle" icon="search" />
    <Button type="dashed" icon="search">Search</Button>
  </div>;
  }],
  "meta": {}
};
```
也就是说markdown中的pre标签已经被完全替换成为一个jsonmlReactLoader函数了!

### 2.注意的问题

(1)jsx本身通过markdown-loader转化是没有问题的，在https://astexplorer.net/#/tSIO7NIclp/3可以正常转化为AST

(2)虽然有很多警告或者错误，但是依然可以转化为正常的AST，但是extends React.components此种不行.

(3)问题已经解决，添加下面内容在package.json中，是因为import的原因，同时我也没有添加babel-loader

```js
"babel": {
    "presets": [
      "es2015-ie",
      "react",
      "stage-0"
    ],
    "plugins": [
      "add-module-exports",
      [
        "transform-runtime",
        {
          "helpers": false,
          "polyfill": false,
          "regenerator": true,
          "moduleName": "babel-runtime"
        }
      ]
    ]
  }
```

(4)对于markdown来说，我们首先会获取到所有的plugin的node模块然后对我们的jsonml进行处理，所以每一个plugin的node模块处理的其实是jsonml，而不是我们经过babel-loader处理后的结果。最后，我们会将jsonml转化为字符串类型，也就是module.export给我们的babel-loader继续处理，因为loader只会处理字符串或者Buffer。但是我们的babel-loader最后输出的依然是object，而不是string类型了!