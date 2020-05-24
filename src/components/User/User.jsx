import React from 'react';

const User = ({user}) => {
    return (
        <div className="card">
        <div className="card-body">
        <img src={user.avatar_url} alt=""/>
        <h2>{user.name} </h2>
        <p>{user.company}</p>
        <p>{user.bio}</p>
        </div>    
        </div>
    );
};

export default User;