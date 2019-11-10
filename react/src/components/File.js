import React from 'react';
// @TODO add to package
import uuidv4 from 'uuid/v4';

class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: null,
            videoUrl: null,
            uploadProgress: 0
        };
        this.refImage = React.createRef();
        this.refDisplayImage = React.createRef();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.readURL = this.readURL.bind(this);
    }

    handleOnClick() {
        console.log('handleOnClick');
    }

    handleChange() {
        const files = this.refImage.current.files;
        console.log('handleChange', files, files && true);
        let {getFiles, model, type} = this.props;
        if (model && type == 'image') getFiles = model.setImagePath;
        if (model && type == 'video') getFiles = model.setVideoPath;
        getFiles(files);

        if (this.refImage.current.accept.includes('image')) {
            console.log('File type is image');
            this.readURL();
        }
        // this.refImage.current.value = '';
    }

    readURL() {
        const input = this.refImage.current; // used for all ie image and video
        console.log('readURL', input.files, input.files && true && input.files[0]);

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            console.log('readURL if');
            reader.onload = (e) => {
                this.refDisplayImage.current.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        var {uploadProgress, videoUrl, imageUrl, model} = nextProps;
        if (model) {
            var {uploadProgress, videoUrl, imageUrl} = model;
            if(!videoUrl) videoUrl = model.form.videoUrl;
        }
        this.setState({uploadProgress, videoUrl, imageUrl});
    }

    render() {
        const id = uuidv4();
        let accept = "*";
        const {type} = this.props;
        if (type && type == 'image') accept = "image/x-png,image/gif,image/jpeg";
        if (type && type == 'video') accept = "video/mp4,video/x-m4v,video/*";

        return (
            <div className="file-upload">
                <header>
                    <p style={{margin: 0}}><i className="fas fa-cloud-upload-alt"></i> &nbsp;
                        UPLOAD FILES
                    </p>
                </header>
                <main>
                    <input accept={accept} ref={this.refImage} multiple type="file" id={id}
                           onClick={this.handleOnClick} onChange={this.handleChange}/>
                    <label htmlFor={id} className="upload">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Drag your files here</p>
                    </label>
                    <div className="display">
                        {type && type == 'video'
                            ? <video width="100%" controls autoPlay={true} key={this.state.videoUrl}>
                                <source src={this.state.videoUrl} type="video/mp4"></source>
                            </video>
                            : <img ref={this.refDisplayImage} style={{width: '100%'}} src={this.state.imageUrl}
                                   alt="Image"/>
                        }
                    </div>
                </main>
                <footer>
                    <span className="progress" style={{width: this.state.uploadProgress + '%'}}></span>
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
