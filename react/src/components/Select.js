import React from 'react';


class Select extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {isVisible, onSelect, list} = this.props;

        return (
            <div className="dd-wrapper">
                <div className="dd-header dd-header-open" id="select-city"
                     onClick={(e) => this.showAdminList(e)}>
                    <div className="dd-header-title"
                         id="dd-header-title"> {this.state.admin == 1 ? 'Yes' : 'No'} </div>
                    <div className="dd-icon"><i className="fas fa-angle-down"></i></div>
                </div>
                <ul className="dd-list" id="dd-list"
                    style={{display: isVisible ? 'block' : 'none'}}>
                    {
                        list.map((item, i) => <li
                            key={i}
                            onClick={() => onSelect(item.value)} id={item.value}
                            className="dd-list-item">{item.label}</li>)
                    }
                </ul>
            </div>
        )
    }
}

export default Select;
