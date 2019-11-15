import ActiveRecord from './ActiveRecord';

class Show extends ActiveRecord {
    constructor(name) {
        super(name);
        this.form = {
            title: '',
            description: '',
            episodes: [],
        };
        this.setImagePath = this.setImagePath.bind(this);
        this.setVideoPath = this.setVideoPath.bind(this);
        console.log('Shows', this.types);
    }

    onSelect = () => {

    }

    getFiles = () => {

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

    /*get types() {
        const superTypes = super.types;
        const name = 'episodes';

        return Object.assign({}, superTypes,
            {
                episodes: {
                    create: name + '.create',
                    create_success: name + '.create.success',
                    create_fail: name + '.create.fail',
                }
            });
    }*/


}

export default Show;
