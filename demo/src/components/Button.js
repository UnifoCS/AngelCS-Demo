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

export class TabButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        const text = this.props.text;
        const { isToggleOn } = this.state;

        return (
            <div>
            {
                isToggleOn ? (
                    <div className="tab_button active_tab_button" onClick={this.handleClick}>
                        {text}
                    </div>
                ) : (
                    <div className="tab_button" onClick={this.handleClick}>
                        {text}
                    </div>
                )
            }
            </div>
        );

    }
}