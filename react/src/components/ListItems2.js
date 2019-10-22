import React from 'react';

const Li = ({fields, item, itemDeleteAction, itemEditAction}) => {
    const handleDelete = (e) => {
        e.preventDefault();
        itemDeleteAction(item.id);
    };
    return (
        <li className="list-group-item">
            <div className="list-group-item-data">
                {
                    Object.keys(item).map( key => fields && fields.includes(key) ? <div key={item[key]+Math.random()} style={{flex: 1}} href="#">{item[key]}</div> : null)
                }
            </div>
            <div className="list-group-item-buttons">
                <div style={{flex: 1}}>
                    <button onClick={() => itemEditAction(item)} className="button-small">Edit</button>
                </div>
                <div style={{flex: 1}}>
                    <button onClick={(e) => handleDelete(e)} className="button-small">Delete</button>
                </div>
            </div>
        </li>
    );
};

class ListItems2 extends React.Component {

    constructor(props) {
        super(props);
        this.itemEditAction = this.itemEditAction.bind(this);
    }

    itemEditAction(item) {
        console.log('Item edit: ', item);
        this.props.itemEditAction(item);
    }

    render() {
        const {items, itemDeleteAction, itemEditAction, fields} = this.props;
        if (! items || items.length === 0) return <div>Loading...</div>;
        console.log('Items:', items);

        return (
            <ul className="list-group u-margin-top-big">
                {
                    items.map((item, i) => <Li fields={fields} itemDeleteAction={itemDeleteAction} itemEditAction={itemEditAction} key={i} item={item}></Li>)
                }
            </ul>
        )
    }
}

export default ListItems2;
