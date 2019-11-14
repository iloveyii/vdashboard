import React from 'react';
// @TODO add to package
import uuidv4 from 'uuid/v4';

class File extends React.Component {

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
        let accept = "*";
        const {type} = this.props;
        if (type && type == 'image') accept = "image/x-png,image/gif,image/jpeg";
        if (type && type == 'video') accept = "video/mp4,video/x-m4v,video/*";
        const {model} = this.state;
        if (!model.form) return <div>Loading ...</div>

        return (
            <div className="file-upload">
                <header>
                    <p style={{margin: 0}}><i className="fas fa-cloud-upload-alt"></i> &nbsp;
                        UPLOAD FILES
                    </p>
                </header>
                <main>
                    <input accept={accept} ref={this.refImage} multiple type="file" id={id}
                           onChange={this.handleChange}/>
                    <label htmlFor={id} className="upload">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Drag your files here</p>
                    </label>
                    <div className="display">
                        {type && type == 'video'
                            ? <video width="100%" controls autoPlay={true} key={model.form.video}>
                                <source src={model.form.video} type="video/mp4"></source>
                            </video>
                            : <img ref={this.refDisplayImage} style={{width: '100%'}} src={model.form.image}
                                   alt="Image"/>
                        }
                    </div>
                </main>
                <footer>
                    <span className="progress" style={{width: Number(model.uploadProgress) + '%'}}></span>
                </footer>

            </div>
        )
    }
}

File.defaultProps = {
    id: 'image_upload',
    accept: 'image/x-png,image/gif,image/jpeg',
    getFiles: (files) => console.log('You chose these files: ', files)
};

export default File;
