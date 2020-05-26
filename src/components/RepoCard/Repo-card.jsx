import React from 'react';
import './RepoCard.css'

const RepoCard = ({repo}) => {
    return (
        <div className="carddd">
        <div className="col-sm-6 ">
            <div className="card">
            <div className="card-body">
           <a target="_blank" href={repo.html_url}> <h3>{repo.full_name}</h3></a>
            <p><strong>Stars:</strong> {repo.stargazers_count}</p>
            <p><strong>Watchers:</strong> {repo.watchers_count}</p>
            </div>
            </div>
            </div>
            </div>
        
    );
};

export default RepoCard;