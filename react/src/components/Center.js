import React from 'react';
import UserInfo from "./UserInfo";

class Center extends React.Component {

    render() {
        const {title} = this.props;

        return (
            <div className="dashboard--center" onClick={this.handleCenterClick}>
                <div style={{textAlign: 'right'}}><UserInfo /></div>
                <h1 className="h1">{title}</h1>
                {this.props.children}
            </div>
        )
    }
}

export default Center;
