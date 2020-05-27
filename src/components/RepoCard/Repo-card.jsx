import React from 'react';
import './RepoCard.css'

const RepoCard = ({repo}) => {
    return (
        
        <div className="col-sm-5 ">
            <div className="card ne">
            <div className="card-body ove n">
           <a className="link" target="_blank" href={repo.html_url}> <h3>{repo.full_name}</h3></a>
            <p><strong>Stars:</strong> {repo.stargazers_count}</p>
            <p><strong>Watchers:</strong> {repo.watchers_count}</p>
            <p className="card-text ove">{repo.description}</p>
            </div>
            </div>
            
            </div>
        
    );
};

export default RepoCard;