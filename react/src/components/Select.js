import React from 'react';

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            selected: {
                value: 'na',
                label: 'Select genre'
            }
        };
    }

    showHide = (e) => {
        e.stopPropagation();
        this.setState({isVisible: !this.state.isVisible});
    };

    handleOnClick = (item) => {
        console.log('handleOnClick ', item);
        const isVisible = false;
        this.state.model.onSelect(item, this.props.attr);
        this.setState({isVisible});
    };

    componentDidMount() {
        let {model, attr} = this.props;
        console.log('componentDidMount', model, attr);
        if (model) {
            this.setState({model, attr});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {model} = nextProps;
        if (model) {
            this.setState({model});
        }
    }

    render() {
        let {model, attr} = this.state;
        if(!model) return <div>Loading ... </div>

        return (
            <div className="dd-wrapper">
                <div className="dd-header dd-header-open" id="select-city"
                     onClick={(e) => this.showHide(e)}>
                    <div className="dd-header-title"
                         id="dd-header-title"> {model.selected(attr).label} </div>
                    <div className="dd-icon"><i className="fas fa-angle-down"></i></div>
                </div>
                <ul className="dd-list" id="dd-list"
                    style={{display: this.state.isVisible ? 'block' : 'none'}}>
                    {
                        model.getSelectList(attr).map((item, i) => <li
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
    data: [
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
    onSelect: (item) => console.log('You selected item ', item)
};
export default Select;
