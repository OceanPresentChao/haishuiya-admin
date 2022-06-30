import request from '@/utils/request';

export function requestSlogan() {
    return request({
        url: 'slogan',
        method: "GET",
        params: {
            c: 'a'
        }
    })
}