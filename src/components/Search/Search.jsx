import React, { Component } from 'react';

class Search extends Component {
    state={
        Username:"na-win-27",
    }


    handleChange=e=>{
        this.setState({Username:e.target.value})
    }

    render() {
        const {fetchData}=this.props
        const {Username}=this.state
        return (
            
            <div className="bg-dark">
            <div className="container py-5">
            <div className="row">
            <div className="col-8 offset-2 text-center">
            <div className="row">
            <div className="col-9">
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
             className="btn btn-large btn-success">Search</button>
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