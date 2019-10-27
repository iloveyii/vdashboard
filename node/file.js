const constants = require('./constants');
const uuidv1 = require('uuid/v1');

const file = {
    save: function (req) {
        console.log('Saving to');
        const imageFile = req.files ? req.files.image_path : null;
        const videoFile = req.files ? req.files.video_path : null;
        const fileNameNumber = uuidv1();
        const result = {
            image_path: null,
            video_path: null
        };

        if (imageFile) {
            const imageFilePath = constants.IMAGES_DIR + '/' + fileNameNumber + '_' + imageFile.name;
            const image_path = 'images/' + fileNameNumber + '_' + imageFile.name;
            this.moveFile(imageFile, imageFilePath);
            result.image_path = image_path;
            result.image_url = constants.IMAGES_URL + fileNameNumber + '_' + imageFile.name;
        } else {
            result.image_path_status = ' No image file attached';
        }

        if (videoFile) {
            const videoFilePath = constants.VID_DIR + '/' + fileNameNumber + '_' + videoFile.name;
            const video_path = 'videos/' + fileNameNumber + '_' + videoFile.name;
            this.moveFile(imageFile, videoFilePath);
            result.video_url = constants.VIDEOS_URL + fileNameNumber + '_' + imageFile.name;
            result.video_path = video_path;
        } else {
            result.video_path_status = 'No video file attached';
        }

        console.log('before return from save(): ', result);

        return result;
    },

    moveFile: function (file, fullFilePath) {
        console.log('Inside moveFile ', file);
        let message = 'File upload failed';

        try {
            // Mv file to some dir
            file.mv(fullFilePath, err => {
                if (err) {
                    return 500
                }

                console.log('File saved to directory ' + fullFilePath);
                message = 'Image File upload success, ';
                return {
                    status: 'ok',
                    message
                }
            });

            return {
                status: 'not ok',
                message
            }
        } catch (e) {
            console.log('Some error in saving the file ', e);
        }
    }


};

module.exports = file;
