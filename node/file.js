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
            const i = this.moveFile(imageFile, imageFilePath);
            if (i.status == 'ok') {
                result.image_path = image_path;
            }
        }

        if (videoFile) {
            const videoFilePath = constants.VID_DIR + '/' + fileNameNumber + '_' + videoFile.name;
            const video_path = 'videos/' + fileNameNumber + '_' + videoFile.name;
            const v = this.moveFile(imageFile, videoFilePath);
            if(v.status=='ok') {
                result.video_path = video_path;
            }
        }

        console.log(result);

        return result;
    },

    moveFile: async function (file, fullFilePath) {
        console.log('Inside moveFile ', file);
        let message = 'File upload failed';

        try {
            // Mv file to some dir
            await file.mv(fullFilePath, err => {
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

exports = file;
file.save({});
