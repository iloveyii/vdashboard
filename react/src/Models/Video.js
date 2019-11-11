import {apiServer} from "../common/constants";

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
        id: '',
        title: '',
        description: '',
        genre: 'rock',
        image_path: 'images/ff50cfe0-f591-11e9-b16f-7da8357c7944_14.png',
        video_path: 'videos/ff50cfe0-f591-11e9-b16f-7da8357c7944_songs14.mp4',
    };
    _formResult = {
        affectedRows: 0
    };
    _display_fields = ['id', 'title', 'genre'];
    _subscribed = [];
    forceUpdate = () => null;
    _videoUrl = null;
    _imageUrl = null;

    // If form is null then new record - create mode
    constructor(form = null) {
        if (form && typeof form == 'object') {
            this.form = form;
            this.mode = 'update';
        } else if (form && typeof form == 'function') {
            this.forceUpdate = form;
        }
        console.log('TEST Video constructor', this._form);
        this.setGenre = this.setGenre.bind(this);
        this.setUploadProgress = this.setUploadProgress.bind(this);
        this.setImagePath = this.setImagePath.bind(this);
        this.setVideoPath = this.setVideoPath.bind(this);

        this.onSelect = this.onSelect.bind(this);
    }

    get __class() {
        return 'Video';
    }

    subscribe(method) {
        if (Array.isArray(method)) {
            this._subscribed = [...this._subscribed, ...method];
        } else {
            this._subscribed.push(method);
        }
        console.log('Subscribed', this._subscribed);
    }

    callSubscribed(method) {
        console.log('Subscribed callSubscribed', method);
        if (this._subscribed.includes(method)) {
            console.log('Subscribed callSubscribed if', method);
            this.forceUpdate();
        }
    }


    print() {
        console.log('Videos constructor', this._mode, this._form);
    }

    // Item, not string
    // INTERFACE Select
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
        this._form.genre = item.value;
    }

    setGenre(item) {
        this._form.genre = item.value;
    }

    // INTERFACE Select
    onSelect(item) {
        this.genre = item;
    }

    get id() {
        return this._form.id ? this._form.id : this._form._id;
    }

    get genre() {
        return this._form.genre;
    }

    // Model editing mode
    set mode(m) {
        this._mode = m;
    }

    get mode() {
        return this._mode;
    }

    set form(form) {
        console.log('TEST Video form', this._form);
        this._form = form;
    }

    get form() {
        return this._form;
    }

    set formResult(r) {
        this._formResult = r;
        if (r && r.affectedRows > 0) {
            this.mode = 'update';
            this._imageUrl = r.image_path;
            this._videoUrl = r.video_path;
            this.callSubscribed('formResult');
        }
    }

    set formFieldByE(e) {
        this._form[e.target.id] = e.target.value;
    }

    get videoUrl() {
        if (this._form.result && this._form.result.video_url) {
            return this._form.result.video_url;
        }
        if(this._form.videoUrl) return this._form.videoUrl;
        if(this._form.video) return this._form.video;
    }

    get imageUrl() {
        if (this._form.result && this._form.result.image_url) {
            return this._form.result.image_url;
        }
        if(this._form.imageUrl) return this._form.imageUrl;
        if(this._form.image) return this._form.image;
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
        this.callSubscribed('setUploadProgress');
            console.log('TEST Video form setUploadProgress', this.uploadProgress, value);
        if(this.uploadProgress > 99) {
            this.resetForm();
            console.log('TEST Video form setUploadProgress', this.form, this.mode);
        }
    }

    resetForm() {
        this.form = new Video().form;
        this.mode = 'create';
    }

    get uploadProgress() {
        return this._uploadProgress;
    }

    submitForm(action) {
        const formData = new FormData();

        Object.keys(this._form).map(key => {
            formData.append(key, this.form[key]);
            console.log('Form key', key, formData.getAll(key));
        });

        console.log('Before action', formData);

        this.mode === 'create' ? action(formData, this.setUploadProgress) : action(formData, this.setUploadProgress);
    }
}

export default Video;

