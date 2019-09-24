import React from 'react';
import './Button.css';

export default function Button(obj) {
    const text = obj.text;

    return (
        <button className="square_button">
            {text}
        </button>
    );
}

