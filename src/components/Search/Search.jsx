import React, { Component } from 'react';
import './Search.css'
class Search extends Component {
    constructor(props){
        super(props);
        this.myRef=React.createRef();
    }
    state={
        Username:"na-win-27",
    }


    handleChange=e=>{
        this.setState({Username:e.target.value})
    }

    componentDidMount(){
    
    }

    render() {
        console.log(this.myRef)
        const {fetchData}=this.props
        const {Username}=this.state
        return (
            
            <div className="c">
            <div className="container py-5">
            <div className="row">
            <div className="col-8 offset-2 text-center">
            <div className="row">
            <div className="col-8 ">
            <input className="form-control" 
            value={Username}
            onChange={this.handleChange}
            type="text"
            name="username"
            placeholder="Enter Username"/>
            </div>
            <div className="col-3">
            <button onClick={()=>{
                fetchData(Username)
            }}
            ref={this.myRef}
             className="btn btn-large btn-dark">Search</button>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        );
    }
}

export default Search;