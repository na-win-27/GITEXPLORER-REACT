import React, { Component } from 'react';

class Search extends Component {
   inputRef=React.createRef();
   
   handleClick=()=>{
       const value=this.inputRef.current.value
       alert(value)
   }
   
   render() {
        
        return (
            <div>
                <input 
                ref={this.inputRef}
                type="text" 
                name="username" 
                placeholder="Enter username"
                />
                <button onClick={this.handleClick}>CLICK ME</button>
            </div>
        );
    }
}

export default Search;