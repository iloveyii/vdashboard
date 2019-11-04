import React from 'react';

const Div = ({_item}) => {
    if (Array.isArray(_item)) {
        return <Table items={_item} ></Table>
    } else {
        return <div key={_item + Math.random()} style={{flex: 1}} href="#">{_item}</div>
    }
};

const Li = ({fields, item, itemDeleteAction, itemEditAction}) => {
    const handleDelete = (e) => {
        e.preventDefault();
        itemDeleteAction(item.id);
    };
    console.log(item);
    let _item = item;

    if (item.__class && item.__class === 'Video') {
        _item = item.form;
    }

    return (
        <li className="list-group-item">
            <div className="list-group-item-data">
                {
                    Object.keys(_item).map(key => fields && fields.includes(key) ?
                        <div key={_item[key] + Math.random()} style={{flex: 1}} href="#">{_item[key]}</div> : null)
                }
            </div>
            <div className="list-group-item-buttons">
                <div style={{flex: 1}}>
                    <button onClick={() => itemEditAction(_item)} className="button-small">Edit</button>
                </div>
                <div style={{flex: 1}}>
                    <button onClick={() => itemDeleteAction(_item)} className="button-small">Delete</button>
                </div>
            </div>
        </li>
    );
};

class Table extends React.Component {

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
        if (!items || items.length === 0) return <div>Loading...</div>;
        console.log('Items:', items);

        return (
            <ul className="list-group u-margin-top-big">
                {
                    items.map((item, i) => <Li fields={fields} itemDeleteAction={itemDeleteAction}
                                               itemEditAction={itemEditAction} key={i} item={item}></Li>)
                }
            </ul>
        )
    }
}

Table.defaultProps = {
    fields: ['id', 'title', 'genre'],
    items: [
        {
            id: 2,
            title: "Laboris soluta nostr",
            description: "Ad maxime possimus ",
            genre: "jazz",
            image_path: "images/85588900-f44a-11e9-ab34-c7f808721400_23.png",
        },
        {
            id: 1,
            title: "Molestiae aliquam it",
            description: "Ea ea architecto eni",
            genre: "jazz",
            image_path: "images/607ad250-f44a-11e9-ab34-c7f808721400_24.png",
        }
    ]
};
export default Table;
