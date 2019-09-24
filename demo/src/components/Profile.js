import React from 'react';
import './Profile.css';

export default function Profile(props) {
    const name = props.name;
    const position = props.position;

    return (
        <div className="profile_container">
            <div className="profile_photo">
            </div>
            <div className="name">
                {name}
            </div>
            <div className="position">
                {position}
            </div>
        </div>
    );
}

