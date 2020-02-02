import React from 'react';
import UserInfo from "./UserInfo";
import QRCode from 'qrcode.react';


class Center extends React.Component {

    render() {
        const {title} = this.props;

        return (
            <div className="dashboard--center" onClick={this.handleCenterClick}>
                <div style={{padding: '20px', backgroundColor: 'white'}}><QRCode value="exp://10.42.0.1:19000" /></div>
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
