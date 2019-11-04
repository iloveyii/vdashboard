const constants = require('./config/constants');
const uuidv1 = require('uuid/v1');

const _file = {
    removeSpaces: function(str) {
        return (str.replace(/ /g, '')).toLowerCase();
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
            const imageFilePath = constants.IMAGES_DIR + '/' + fileNameNumber + '_' + this.removeSpaces(imageFile.name);
            const image_path = 'images/' + fileNameNumber + '_' + this.removeSpaces(this.removeSpaces(imageFile.name));
            imageFile && await this.moveFile(imageFile, imageFilePath);
            result.image_path = image_path;
            result.image_url = constants.IMAGES_URL + fileNameNumber + '_' + this.removeSpaces(imageFile.name);
        } else {
            result.image_path_status = ' No image file attached';
        }

        if (videoFile) {
            const videoFilePath = constants.VID_DIR + '/' + fileNameNumber + '_' + this.removeSpaces(videoFile.name);
            const video_path = 'videos/' + fileNameNumber + '_' + this.removeSpaces(videoFile.name);
            videoFile && await this.moveFile(videoFile, videoFilePath);
            result.video_url = constants.VIDEOS_URL + fileNameNumber + '_' + this.removeSpaces(videoFile.name);
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
