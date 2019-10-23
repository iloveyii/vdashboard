const HTTP = 'http://localhost:8090/';

class Video {
    _mode = 'create';
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
    _uploadProgress = 0;
    _form = {
        id: null,
        title: '',
        description: '',
        genre: 'rock',
        image_path: 'images/ff50cfe0-f591-11e9-b16f-7da8357c7944_14.png',
        video_path: 'videos/ff50cfe0-f591-11e9-b16f-7da8357c7944_songs14.mp4',
    };
    forceUpdate = () => null;

    // If form is null then new record - create mode
    constructor(form = null) {
        if (form && typeof form == 'object') {
            this.form = form;
            this.mode = 'update';
        } else if(form && typeof form=='function') {
            this.forceUpdate = form;
        }
        console.log('TEST Video constructor', this._form);
        this.setGenre = this.setGenre.bind(this);
        this.setUploadProgress = this.setUploadProgress.bind(this);
        this.setImagePath = this.setImagePath.bind(this);
        this.setVideoPath = this.setVideoPath.bind(this);
    }

    get __class() {
        return 'Video';
    }

    print() {
        console.log('Videos constructor', this._mode, this._form);
    }

    get selected() {
        return this.genreList.find( item => item.value == this.form.genre);
    }

    set mode(m) {
        this._mode = m;
    }
    set form(form) {
        console.log('TEST Video form', this._form);
        this._form = form;
    }
    get form() {
        return this._form;
    }

    set formFieldByE(e) {
        this._form[e.target.id] = e.target.value;
        console.log('TEST Video form', this._form);
    }

    get videoUrl() {
        return HTTP + this._form.video_path;
    }

    get imageUrl() {
        return HTTP + this._form.image_path;
    }

    get genreList() {
        return this._genreList;
    }

    set genre(item) {
        this._form.genre = item.value;
    }
    setGenre(item) {
        this._form.genre = item.value;
    }
    get genre() {
        return this._form.genre;
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

    set uploadProgress(value) {
        this._uploadProgress = value;
    }

    setUploadProgress(value) {
        this._uploadProgress = value;
        this.forceUpdate();
        console.log('TEST Video form', this.uploadProgress, value);
    }

    get uploadProgress() {
        return this._uploadProgress;
    }

    submitForm(action) {
        const formData = new FormData();

        Object.keys(this._form).map(key => {
            formData.append(key, this._form[key]);
            console.log('Form key', key, formData);
        });

        this.mode === 'create' ? action(formData, this.setUploadProgress) : action(formData, this.setUploadProgress);
    }



}

export default Video;

