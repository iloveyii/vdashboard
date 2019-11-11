import ActiveRecord from './ActiveRecord';

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
            description: '',
            mode: this.types.create
        };
        this.setImagePath = this.setImagePath.bind(this);
        this.setVideoPath = this.setVideoPath.bind(this);
        console.log('Shows', this.types);
    }

    getFiles = () => {

    };

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

    onSelect = (item) => {
        this.genre = item;
    }

    get selected() {
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
    onSelect(item) {
        this.form.genre = item;
    }


}

export default Episode;
