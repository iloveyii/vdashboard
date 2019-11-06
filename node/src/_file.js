const constants = require('./config/constants');
const uuidv1 = require('uuid/v1');

const _file = {
    removeSpaces: function(str) {
        return (str.replace(/\W\./g, '')).toLowerCase();
    },
    save: async function (req) {
        const imageFile = req.files ? req.files.image_path : null;
        const videoFile = req.files ? req.files.video_path : null;
        const fileNameNumber = uuidv1();
        const result = {
            image_path: null,
            video_path: null
        };

        if (imageFile) {
            let cleanFileName = this.removeSpaces(imageFile.name);
            const imageFilePath = constants.IMAGES_DIR_PATH + '/' + fileNameNumber + '_' + cleanFileName;
            const image_path = constants.IMAGES_DIR + fileNameNumber + '_' + cleanFileName;
            imageFile && await this.moveFile(imageFile, imageFilePath);
            result.image_path = image_path;
            result.image_url = constants.IMAGES_URL + fileNameNumber + '_' + cleanFileName;
        } else {
            result.image_path_status = ' No image file attached';
        }

        if (videoFile) {
            let cleanFileName = this.removeSpaces(videoFile.name);
            const videoFilePath = constants.VIDEOS_DIR_PATH + '/' + fileNameNumber + '_' + cleanFileName;
            const video_path = constants.VIDEOS_DIR + fileNameNumber + '_' + cleanFileName;
            videoFile && await this.moveFile(videoFile, videoFilePath);
            result.video_url = constants.VIDEOS_URL + fileNameNumber + '_' + cleanFileName;
            result.video_path = video_path;
        } else {
            result.video_path_status = 'No video file attached';
        }

        console.log('before return from save(): ', result);

        return result;

    },

    moveFile: function (file, fullFilePath) {
        let message = 'File upload failed';

        return new Promise(function (resolve, reject) {
            try {
                // Mv file to some dir
                file.mv(fullFilePath, err => {
                    if (err) {
                        return 500
                    }

                    console.log('File saved to directory ' + fullFilePath);
                    message = 'Image File upload success, ';
                    resolve({
                        status: 'ok',
                        message
                    });
                });
            } catch (e) {
                console.log('Some error in saving the file ', e);
                reject({
                    status: 'not ok',
                    message
                });
            }
        });
    }
};

module.exports = _file;
