import React from 'react';


class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.refImage = React.createRef();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleOnClick() {
        const files = this.refImage.current.files;
        console.log('handleOnClick', files);
    }

    handleChange() {
        const files = this.refImage.current.files;
        console.log('handleChange', files);
        this.props.getFiles(files);
        this.refImage.current.value = '';
    }



    render() {
        return (
            <div className="file-upload">
                <header>
                    <p><i className="fas fa-cloud-upload-alt"></i> &nbsp;
                        UPLOAD FILES</p>
                </header>
                <main>
                    <input ref={this.refImage} multiple type="file" id="file" onClick={this.handleOnClick} onChange={this.handleChange}/>
                    <label htmlFor="file" className="upload">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Drag your files here</p>
                    </label>
                    <div className="display"></div>
                </main>
                <footer>
                    <span className="progress"></span>
                </footer>

            </div>
        )
    }
}

export default FileUpload;
