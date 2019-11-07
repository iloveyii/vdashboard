import axios from 'axios';
import {apiServer} from '../common/constants';

const showEndPoint = '/api/v1/shows';
const episodeEndPoint = '/api/v1/shows';
const showServer = apiServer + showEndPoint;
const episodeServer = apiServer + episodeEndPoint;

export default {
    video: {
        read: () =>
            axios.get(showServer).then(res => res.data).catch(error => {
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
            return axios.post(showServer, data.video, config).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
        },
        delete: (video) =>
            axios.delete(showServer + '/' + video.id).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
        update: (data) => {
            const formData = data.formData;
            console.log('Inside axios put ,' , JSON.stringify(data));
            const config = {
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    console.log('PercentCompleted: ', percentCompleted);
                    data.action(percentCompleted);
                }
            };
            return axios.put(showServer + '/' + formData.getAll('_id'), formData, config).then(res => {console.log('Update response: ', res); return res.data; }).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
        }
    },
    episode : {
        add: (data) => {
            const config = {
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    console.log('PercentCompleted: ', percentCompleted);
                    data.action(percentCompleted);
                }
            };
            return axios.post(episodeServer, data.video, config).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
        },
    }
}
