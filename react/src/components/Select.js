import React from 'react';


class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            selected: {
                value: '',
                label: ''
            }
        };

        this.handleOnClick = this.handleOnClick.bind(this);
        this.showHide = this.showHide.bind(this);
    }

    showHide(e) {
        e.stopPropagation();
        this.setState({isVisible: !this.state.isVisible});
    }

    handleOnClick(selected) {
        const isVisible = false;
        this.setState({selected, isVisible});
        const {onClickGetSelected} = this.props;
        onClickGetSelected(selected);
    }

    render() {
        const {list} = this.props;

        return (
            <div className="dd-wrapper">
                <div className="dd-header dd-header-open" id="select-city"
                     onClick={(e) => this.showHide(e)}>
                    <div className="dd-header-title"
                         id="dd-header-title"> {this.state.selected.label} </div>
                    <div className="dd-icon"><i className="fas fa-angle-down"></i></div>
                </div>
                <ul className="dd-list" id="dd-list"
                    style={{display: this.state.isVisible ? 'block' : 'none'}}>
                    {
                        list.map((item, i) => <li
                            key={i}
                            onClick={() => this.handleOnClick(item)} id={item.value}
                            className="dd-list-item">{item.label}</li>)
                    }
                </ul>
            </div>
        )
    }
}

Select.defaultProps = {
    list: [
        {
            value: 'pop',
            label: 'Pop'
        },
        {
            value: 'jazz',
            label: 'Jazz'
        },
        {
            value: 'rock',
            label: 'Rock'
        },
        {
            value: 'disco',
            label: 'Disco'
        },
    ],
    onClickGetSelected: function (selected) {
        console.log('You selected item :', selected);
    }
}
;
export default Select;
