import ActiveRecord from './ActiveRecord';

class Episode extends ActiveRecord {
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

    onSelect = (item) => {
        this.form.genre = item.value;
    };

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

}

export default Episode;
