import React from 'react';

const Li = ({fields, item, itemDeleteAction, itemEditAction}) => {
    const handleDelete = (e) => {
        e.preventDefault();
        itemDeleteAction(item.id);
    };
    console.log(item);
    return (
        <li className="list-group-item">
            <div className="list-group-item-data">
                {
                    Object.keys(item).map(key => fields && fields.includes(key) ?
                        <div key={item[key] + Math.random()} style={{flex: 1}} href="#">{item[key]}</div> : null)
                }
            </div>
            <div className="list-group-item-buttons">
                <div style={{flex: 1}}>
                    <button onClick={() => itemEditAction(item)} className="button-small">Edit</button>
                </div>
                <div style={{flex: 1}}>
                    <button onClick={() => itemDeleteAction(item)} className="button-small">Delete</button>
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
    fields:['id', 'title', 'genre'],
    items: [
        {id: 4, title: "Dolores velit ratio", description: "Quo minus laborum ut", genre: "rock", image_path: "images/08422f90-f47f-11e9-a1e7-e342a465e3f6_27.png",},
        {id: 3, title: "Omnis sed do magnam ", description: "Ex consequatur sint", genre: "rock", image_path: "images/99f99a20-f44a-11e9-ab34-c7f808721400_11.png",},
        {id: 2, title: "Laboris soluta nostr", description: "Ad maxime possimus ", genre: "jazz", image_path: "images/85588900-f44a-11e9-ab34-c7f808721400_23.png",},
        {id: 1, title: "Molestiae aliquam it", description: "Ea ea architecto eni", genre: "jazz", image_path: "images/607ad250-f44a-11e9-ab34-c7f808721400_24.png",}
    ]
};
export default Table;
