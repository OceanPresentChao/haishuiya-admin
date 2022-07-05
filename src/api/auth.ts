import request from '@/utils/request';

export function requestLogin(params: { username: string, password: string }) {
    return request({
        url: '/realApi/api/login/',
        method: 'GET',
        params
    })
}