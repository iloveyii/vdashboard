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
        this.setImagePath = this.setImagePath.bind(this);
        this.setVideoPath = this.setVideoPath.bind(this);
    }

    set videoPath(files) {
        this._form.video_path = files[0];
    }

    setVideoPath(files) {
        this._form.video_path = files[0];
    }

    set imagePath(files) {
        this._form.image_path = files[0];
    }

    setImagePath(files) {
        this._form.image_path = files[0];
    }

    onSelect2 = (item) => {
        this.genre = item;
    };

    get selected2() {
        return this.genreList.find(item => item.value == this.form.genre);
    }

    get genreList() {
        return this._genreList;
    }

    // INTERFACE Select
    get data() {
        return this._genreList;
    }

    set genre(item) {
        this.form.genre = item.value;
    }

    setGenre(item) {
        this.form.genre = item.value;
    }

    // INTERFACE Select
    onSelect = (item) => {
        this.form.genre = item.value;
    };

    get actions() {
        const actionsSuper = super.actions;
        actionsSuper.read = models.shows.actions.read;
        actionsSuper.create_success = models.shows.actions.read;
        return actionsSuper;
    }
}

export default Episode;
