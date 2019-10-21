import React from 'react';


class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSrc : null,
            progress: 0
        };
        this.refImage = React.createRef();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.readURL = this.readURL.bind(this);
    }

    handleOnClick() {
        const files = this.refImage.current.files;
        console.log('handleOnClick', files);
    }

    handleChange() {
        const files = this.refImage.current.files;
        console.log('handleChange', files, files && true);
        this.props.getFiles(files);
        // this.refImage.current.value = '';
        this.readURL();
    }

    readURL() {
        const input = this.refImage.current;
        console.log('readURL', input.files, input.files && true && input.files[0]);

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            console.log('readURL if');
            reader.onload = (e) => {
                this.setState({imgSrc: e.target.result})
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({progress: nextProps.progress})
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
                    <input accept="image/x-png,image/gif,image/jpeg" ref={this.refImage} multiple type="file" id="file" onClick={this.handleOnClick} onChange={this.handleChange}/>
                    <label htmlFor="file" className="upload">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Drag your files here</p>
                    </label>
                    <div className="display">
                        <img style={{width: '100%'}} src={this.state.imgSrc} alt="Image"/>
                    </div>
                </main>
                <footer>
                    <span className="progress" style={{width:this.state.progress+'%'}}></span>
                </footer>

            </div>
        )
    }
}

export default FileUpload;
