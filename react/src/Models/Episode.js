import ActiveRecord from './ActiveRecord';
import models from '../store/models';

class Episode extends ActiveRecord {
    _genreList = [
        {
            value: 'pop',
            label: 'Pop'
        },
        {
            value: 'jazz',
            label: 'Jazz'
        },
        {
            value: 'rock',
            label: 'Rock'
        },
        {
            value: 'disco',
            label: 'Disco'
        },
    ];

    constructor(name) {
        super(name);
        this.form = {
            title: '',
            number: '',
            description: '',
            image: null,
            video: null,
            genre: 'rock'
        };
        this._selectList.genre = this._genreList;
    }

    set videoPath(files) {
        this._form.video_path = files[0];
    }

    setVideoPath = (files) => {
        this._form.video_path = files[0];
    };

    set imagePath(files) {
        this._form.image_path = files[0];
    }

    setImagePath = (files) => {
        this._form.image_path = files[0];
    };

    get actions() {
        const actionsSuper = super.actions;
        actionsSuper.read = models.shows.actions.read;
        actionsSuper.create_success = models.shows.actions.read;
        return actionsSuper;
    }
}

export default Episode;
