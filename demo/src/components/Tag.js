import React from 'react';
import './Tag.css';

const tagColor = {
    "긍정": "#45D582",
    "부정": "#FF3838",
    "질문": "#F8A32E",
    "중립": "#A7A7A7",
};

export function Tag(props) {
    const name = props.name;
    const color = tagColor[props.name];
    const colorStyle= {
        backgroundColor: {color}.color,
    };

    return (
        <div className="tag_container" style={colorStyle}>
            {name}
        </div>
    );
}

export function BasicTag(props) {
    const text = props.text;

    return (
      <div className="tag_container basic_tag">
          {text}
      </div>
    );
}

export function BasicLongTag(props){
    const text = props.text;


    return (
        <div className="tag_container basic_tag long">
            {text}
        </div>
    )
}

export default Tag;