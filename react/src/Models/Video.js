const HTTP = 'http://localhost:8090/';

class Video {
    mode = 'create';
    genreList = [
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
    uploadProgress = 0;
    form = {
        id: null,
        title: '',
        description: '',
        genre: '',
        image_path: null,
        video_path: null,
    };

    // If form is null then new record - create mode
    constructor(form = null) {
        if (form) {
            this.form = form;
            this.mode = 'update';
        }
        console.log('TEST Video constructor', this.data);
    }

    print() {
        console.log('TEST Video print', this.mode, this.form);
    }

    get getData() {
        console.log('TEST Video getData', this.data);
        return this.data;
    }

    set setData(data) {
        console.log('TEST Video setData', this.data);
        this.data = data;
    }

    get getVidoeUrl() {
        return HTTP + this.data.video_path;
    }

    get getImageUrl() {
        return HTTP + this.data.image_path;
    }

    get getGereList() {
        return this.genreList;
    }

    set setVideoPath(files) {
        this.data.video_path = files[0];
    }

    set setImagePath(files) {
        this.data.image_path = files[0];
    }

    set setUploadProgress(value) {
        this.uploadProgress = value;
    }


}

export default Video;

