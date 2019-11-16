import React from 'react';
import uuidv4 from 'uuid/v4';

class Card extends React.Component {

    /**
     * Handles only model
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            model: {}
        };
        this.refImage = React.createRef();
        this.refDisplayImage = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.readUploadingImage = this.readUploadingImage.bind(this);
    }

    handleChange() {
        const files = this.refImage.current.files;
        let {model, type} = this.props;
        if (model && type == 'image') model.setImagePath(files);
        if (model && type == 'video') model.setVideoPath(files);

        if (this.refImage.current.accept.includes('image')) {
            this.readUploadingImage();
        }
    }

    readUploadingImage() {
        const input = this.refImage.current; // used for all ie image and video

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.refDisplayImage.current.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {model} = nextProps;
        model && this.setState({model});
    }

    componentDidMount() {
        const {model} = this.props;
        console.log('File', model);
        model && this.setState({model});
    }

    render() {
        const id = uuidv4();
        const {items} = this.props;
        if (!items) return <div>Loading ...</div>

        return (
            items.map(item =>
                <div className="file-upload" style={{width:'23%', display:'inline-block', margin: '5px'}}>
                    <header>
                        <p style={{margin: 0}}><i className="fas fa-file"></i> &nbsp;
                            {item.title}
                        </p>
                    </header>
                    <main>
                        <div className="display">
                            <img ref={this.refDisplayImage} style={{width: '100%'}} src={item.image}
                                 alt="Image"/>
                        </div>
                    </main>
                    <footer>
                    </footer>

                </div>
            )

        )
    }
}

Card.defaultProps = {
    id: 'image_upload',
    accept: 'image/x-png,image/gif,image/jpeg',
};

export default Card;
