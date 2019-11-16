import React from 'react';

class VideoPlayer extends React.Component {

    /**
     * video = {title, description, genre, image, video, views}
     * @param props
     */
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
                    <h2>{video.title}</h2>
                    <i className="fas fa-flag" onClick={this.props.close}></i>
                </header>
                <main>
                    <div className="left">
                        <video width="100%" controls autoPlay key={video.video}>
                            <source
                                src={video.video}
                                type="video/mp4"></source>
                        </video>
                    </div>

                    <div className="footer">
                        <div className="footer-image">
                            <img src={video.image}
                                 alt="image"/>
                        </div>

                        <div className="footer-detail">
                            <div className="footer-row">
                                <label htmlFor="">Genre</label>
                                <p>{video.genre}</p>
                            </div>
                            <div className="footer-row">
                                <label htmlFor="">Description</label>
                                <p>{video.description}</p>
                            </div>
                            <div className="footer-row">
                                <i className="far fa-eye"></i>
                                <p>{video.views}</p>
                            </div>
                        </div>
                    </div>
                </main>

            </article>
        )
    }
}

export default VideoPlayer;
