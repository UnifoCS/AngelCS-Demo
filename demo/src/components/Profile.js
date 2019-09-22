import React from 'react';
import './Profile.css';

export default function Profile(name, position) {
    console.log(name, position);
    return (
        <div className="profile_container">
            <div className="profile_photo">
            </div>
            <div className="name">
                김아무개
            </div>
            <div className="position">
                CS Manager
            </div>
        </div>
    );
}

