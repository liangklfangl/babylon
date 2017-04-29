const React =  require('react');
const ReactDOM = require('react-dom');
import { Button } from 'antd';
module.exports = {
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