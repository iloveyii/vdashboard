import React from 'react';
import UserInfo from "./UserInfo";

class Center extends React.Component {

    render() {
        const {title} = this.props;

        return (
            <div className="dashboard--center" onClick={this.handleCenterClick}>
                <div style={{textAlign: 'right'}}><UserInfo /></div>
                {
                    title
                    ? <div className="row">
                            <div className="col-1-of-1">
                                <h1>{title}</h1>
                            </div>
                        </div>
                    : null

                }
                {this.props.children}
            </div>
        )
    }
}

export default Center;
