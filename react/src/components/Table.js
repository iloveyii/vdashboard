import React from 'react';

function Row(data) {
    this.__class = 'Row';

    const dim = {
        id: 1,
        title: 3,
        description: 5,
        genre: 2,
        controls: 5,
        image: 3
    };

    for (let col in data) {
        this[col] = {
            value: data[col],
            flexSize: dim[col] ? dim[col] : 1
        };
    }
    return this;
}

const Div = ({itemRow}) => {
    let el = '';

    if ((itemRow.value + '').includes('http')) {
        el = <img style={{width: '160px'}} src={itemRow.value} alt="Image"/>
    } else {
        el = itemRow.value;
    }

    return <div key={el + Math.random()} style={{flex: itemRow.flexSize}} href="#">{el}</div>
};

const Li = ({fields, item, itemDeleteAction, itemEditAction, itemViewAction}) => {
    const handleDelete = (e) => {
        e.preventDefault();
        itemDeleteAction(item.id);
    };
    let itemArray = item; // Array
    let itemRow = item; // Row

    if (item && item.__class && item.__class === 'Video') {
        itemArray = item.form;
    }

    itemRow = new Row(itemArray);


    return (
        <li className="list-group-item">
            <div className="list-group-item-data">
                {
                    Object.keys(itemRow).map(key => fields && fields.includes(key) ?
                        <Div itemRow={itemRow[key]} key={key}/> : null)
                }
            </div>

            <div className="list-group-item-buttons">
                {
                    itemEditAction && itemEditAction !== null ?
                        <div style={{flex: 1}}>
                            <button onClick={() => itemEditAction(itemArray)} className="button-small">Edit</button>
                        </div>
                        : null
                }

                {
                    itemDeleteAction && itemDeleteAction !== null ?
                        <div style={{flex: 1}}>
                            <button onClick={() => itemDeleteAction(itemArray['_id'])} className="button-small">Delete</button>
                        </div>
                        : null
                }
                {
                    itemViewAction && itemViewAction !== null ?
                        <div style={{flex: 1}}>
                            <button onClick={() => itemViewAction(itemArray)} className="button-small">View</button>
                        </div>
                        : null
                }
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
        const {items, itemDeleteAction, itemEditAction, itemViewAction, fields} = this.props;
        if (!items || items.length === 0) return <div>Loading...</div>;

        return (
            <ul className="list-group u-margin-top-big">
                {
                    items.map((item, i) => Array.isArray(item) ? null :
                        <Li fields={fields} itemDeleteAction={itemDeleteAction}
                            itemEditAction={itemEditAction} itemViewAction={itemViewAction} key={i} item={item}></Li>)
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

