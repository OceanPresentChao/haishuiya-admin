import request from '../utils/request';

const config = {
    key: 'SsndOD_F9UBLp82w8',
    location: 'ip',
}

export default {
    getForecast() {
        return request({
            url: 'weather/v3/weather/daily.json',
            method: 'GET',
            params: config
        }).catch(err => console.log("weather", err));
    },
    getLife() {
        return request({
            url: 'weather/v3/life/suggestion.json',
            method: 'GET',
            params: config
        }).catch(err => console.log("weather", err));
    },

}