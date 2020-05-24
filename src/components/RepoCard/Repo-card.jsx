import React from 'react';

const RepoCard = ({repo}) => {
    return (
        <div>
            <div className="card">
            <div className="card-body">
           <a target="_blank" href={repo.html_url}> <h3>{repo.full_name}</h3></a>
            <p><strong>Stars:</strong> {repo.stargazers_count}</p>
            <p><strong>Watchers:</strong> {repo.watchers_count}</p>
            </div>
            </div>
        </div>
    );
};

export default RepoCard;