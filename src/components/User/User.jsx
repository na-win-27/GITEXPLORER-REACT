import React from 'react';
import './user.css'

const User = ({user}) => {
    return (
        <div className="card cardd">
        
        <a href={user.html_url} target="_blank" ><img className="card-image-top dp" src={user.avatar_url} alt=""/></a>
        <div className="card-body">
        <h4 className="card-title">{user.name} </h4>
        <p className="card-text">{user.company}</p>
        <a href={user.html_url} target="_blank" className="card-text">{user.login}</a>
        <p className="card-text overf" >{user.bio}</p>
        <p className="card-text overf" >{user.location}</p>
        <p className="card-text overf" >Followers: {user.followers}</p>
        <p className="card-text overf" >Following: {user.following}</p>
        <p className="card-text">Public Repos: {user.public_repos}</p>
        </div>    
        </div>
    );
};

export default User;