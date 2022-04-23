import request from '../utils/request';
export default {
    requestSlogan() {
        return request({
            url: 'slogan',
            method: "GET",
            params: {
                c: 'a'
            }
        }).catch(err => console.log(err));
    }
}