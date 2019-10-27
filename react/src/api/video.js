import axios from 'axios';
import {apiServer} from '../common/constants';

const endPoint = '/api/v1/videos';
const server = apiServer + endPoint;

export default {
    video: {
        read: () =>
            axios.get(server).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
        add: (data) => {
            const config = {
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    console.log('PercentCompleted: ', percentCompleted);
                    data.action(percentCompleted);
                }
            };
            return axios.post(server, data.video, config).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
        },
        delete: (video) =>
            axios.delete(server + '/' + video.id).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
        update: (data) => {
            const formData = data.formData;
            console.log('Inside axios put ,' , data);
            const config = {
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    console.log('PercentCompleted: ', percentCompleted);
                    data.action(percentCompleted);
                }
            };
            axios.put(server + '/' + formData.getAll('id'), formData, config).then(res => {console.log('Update response: ', res); return res.data; }).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
        }
    }
}
