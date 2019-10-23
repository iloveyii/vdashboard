import React from 'react';


class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: null,
            videoUrl: null,
            progress: 0
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
        this.props.getFiles(files, this.props.id);
        if (this.refImage.current.accept.includes('image')) {
            console.log('File type is image');
            this.readURL();
        }
        this.refImage.current.value = '';
    }

    readURL() {
        const input = this.refImage.current;
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
        console.log('componentWillReceiveProps', nextProps);
        const {progress, videoUrl, imageUrl} = nextProps;
        this.setState({progress, videoUrl, imageUrl});
    }

    render() {
        return (
            <div className="file-upload">
                <header>
                    <p style={{margin: 0}}><i className="fas fa-cloud-upload-alt"></i> &nbsp;
                        UPLOAD FILES
                    </p>
                </header>
                <main>
                    <input accept={this.props.accept} ref={this.refImage} multiple type="file" id={this.props.id}
                           onClick={this.handleOnClick} onChange={this.handleChange}/>
                    <label htmlFor={this.props.id} className="upload">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Drag your files here</p>
                    </label>
                    <div className="display">
                        {this.state.videoUrl
                            ? <video width="100%" controls>
                                <source src={this.props.videoUrl} type="video/mp4"></source>
                            </video>
                            : <img ref={this.refDisplayImage} style={{width: '100%'}} src={this.state.imageUrl} alt="Image"/>
                        }
                    </div>
                </main>
                <footer>
                    <span className="progress" style={{width: this.state.progress + '%'}}></span>
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
