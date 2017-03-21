```jsx
 import React from "react";
 import ReactDOM from "react-dom";
 export default Hello extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
               <div>
                  Hello world Component initialzied!
                </div>
             )
    }
 }
 ReactDOM.render(<Hello/>,mountNode);
```