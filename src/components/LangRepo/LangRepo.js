import React from 'react'
import RepoCard from '../RepoCard/Repo-card'
import './LangRepo.css'

const langRepo = ({repos,lang}) => {
    
    const x=repos[0]
    let filtered
    if(x){
    filtered=x.filter(repo=>repo.language===lang)
    }

    

    return (
        <div>
        <div className="langu"></div>
       <div className="container-fluid"> <h3>REPOSITRIES FROM LANGUAGE:{lang}</h3>   <div className="row "> {  lang!==null  && filtered.map(repo=><RepoCard key={repo.id} repo={repo}/>)}</div></div>
        </div>
    );
};

export default langRepo;