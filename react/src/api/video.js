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
        add: (video, config) => {
            var config = {
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    console.log('PercentCompleted: ', percentCompleted);
                }
            };
            return axios.post(server, video, config).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
        },
        delete: (show) =>
            axios.delete(server + '/' + show._id).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
        update: async (show) => {
            console.log('Inside axios put ,' , show);
            await axios.put(server + '/' + show.id, show.formData).then(res => {console.log('Update response: ', res); return res.data; }).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
        }
    }
}
