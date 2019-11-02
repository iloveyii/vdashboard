import React from 'react';

class VideoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({visible: false});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {video} = nextProps;
        console.log('VideoView componentWillReceiveProps', video);
        this.setState({video});
    }

    componentDidMount() {
        const {video} = this.props;
        this.setState({video});
    }


    render() {
        const {video} = this.state;
        if (!video) return <div>Loading</div>

        return (
            <article className="video-view" style={{marginTop: '13px'}}>
                <header>
                    <i className="fas fa-film"></i>
                    <h2>{video.form.title}</h2>
                </header>
                <main>
                    <div className="left">
                        <video width="100%" controls autoPlay key={video.videoUrl}>
                            <source
                                src={video.videoUrl}
                                type="video/mp4"></source>
                        </video>
                    </div>

                    <div className="footer">
                        <div className="footer-image">
                            <img src={video.imageUrl}
                                 alt="image"/>
                        </div>

                        <div className="footer-detail">
                            <div className="footer-row">
                                <label htmlFor="">Genre</label>
                                <p>{video.form.genre}</p>
                            </div>
                            <div className="footer-row">
                                <label htmlFor="">Description</label>
                                <p>{video.form.description}</p>
                            </div>
                            <div className="footer-row">
                                <i className="far fa-eye"></i>
                                <p>355</p>
                            </div>
                        </div>
                    </div>
                </main>

            </article>
        )
    }
}

export default VideoView;
