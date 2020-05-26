import React, { Component } from 'react';
import Search from './components/Search/Search'
import User from './components/User/User'
import RepoCard from './components/RepoCard/Repo-card'
const PAGE_SIZE=20;
class App extends Component {
  state={
    user:null,
    error:null,
    repos:[],
    loading:false,
    page:1
  }
  


fetchRepos=async(username)=>{
  try{
    const {page}=this.state
    const res=await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${PAGE_SIZE}`)
    if(res.ok){
      const data=await res.json();
      return {data,page:page+1}
    }
    const error= await res.json();

    return error

  }catch(err){
    return ("REPO ERROR")

  }
}

  fetchData= async (username)=>{
    this.setState({loading:true},async ()=>{
      try{
        const res = await fetch(`https://api.github.com/users/${username}`);
        const repos=await this.fetchRepos(username);
        if (res.ok && repos){
        const data=await res.json();
        console.log(repos)
        return this.setState({
          user:data,
          repos:repos.data,
          loading:false,
          page:2,
        });
      }
        const error= await res.json();
    
        this.setState({
          error:error.message,
          loading:false,
        })
      }catch(err){
          console.log(err);
          this.setState({
            error:"THERE WAS SOME ERROR"
          })
        }
    })
   

  }


  loadmore=async ()=>{
    const{data,page}=await this.fetchRepos(this.state.user.login)
    if(data){
        this.setState((state)=>({
          repos:[...state.repos,...data],
          page 
        }))
    }
  }

  render() {
    const {repos,user,error,loading,page}=this.state
    console.log(this.state.user)
    console.log(this.state.repos)
    
    const renderRepos=!error && user && repos.length>0
    return (
      <div>
        <Search fetchData={this.fetchData}/>
        {loading &&
        <p>loading</p>
        }
      {error &&
          <p className="text-danger">{error}</p>  
      }
      {
        !error && !loading && user && <User user={user}/>
      }
      
      

     <div className="row"> {repos.length>0 && !error && repos.map(repo=><RepoCard key={repo.id} repo={repo}/>)}</div>
      {  !error && !loading && user && page*PAGE_SIZE < user.public_repos && <button className="btn btn-success" onClick={this.loadmore}>Load More</button>}
      </div>
    );
  }
}

export default App;