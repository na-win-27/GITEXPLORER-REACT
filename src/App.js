import React, { Component } from 'react';
import Search from './components/Search/Search'
import User from './components/User/User'
import RepoCard from './components/RepoCard/Repo-card'
import { Sugar } from 'react-preloaders';
import Chart from './components/Chart/Chart'
import HeadRoom from 'react-headroom'
const PAGE_SIZE=20;
class App extends Component {
  state={
    user:null,
    error:null,
    repos:[],
    loading:false,
    page:1,
    show:false
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
    return (
      <div>
       <HeadRoom style={{
        webkitTransition: 'all .5s ease-in-out',
        mozTransition: 'all .5s ease-in-out',
        oTransition: 'all .5s ease-in-out',
        transition: 'all .5s ease-in-out',
      }}  ><Search fetchData={this.fetchData}/></HeadRoom>
        {loading &&
        <p>loading</p>
        }
      {error &&
          <p className="text-danger">{error}</p>  
      }
      {
        !error && !loading && user && <User user={user}/>
      }
      {
        !error && !loading  && user &&<Chart user={user} />
     }

     {
       !this.state.show &&  user &&
       <div className="d-flex justify-content-center"><button className="btn btn-light" onClick={()=>this.setState({show:true})}>Show Repositories</button></div>
     }

     {
      this.state.show &&  user &&
      <div className="d-flex justify-content-center"><button className="btn btn-light" onClick={()=>this.setState({show:false})}>Hide Repositories</button></div>
    }
      

 <div className="container-fluid">    <div className="row "> { this.state.show && repos.length>0 && !error && repos.map(repo=><RepoCard key={repo.id} repo={repo}/>)}</div></div>
     { this.state.show && !error && !loading && user && page*PAGE_SIZE < user.public_repos && <div class="d-flex justify-content-center"><button className="btn btn-light" onClick={this.loadmore}>Load More</button></div>}
      <Sugar/>
      </div>
     
    );
  }
}

export default App;