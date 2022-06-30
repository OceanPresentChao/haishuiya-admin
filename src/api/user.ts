import request from '@/utils/request';

export function requestGetUserList(params: {
    limit: number,
    page: number,
    s_name?: string,
    s_level?: number
}) {
    return request({
        url: `/realApi/v1/vip/info/`,
        method: 'GET',
        params
    })
}

export function requestCreateUser(body: {
    name: string,
    password: string,
    email: string,
}) {
    return request({
        url: `/realApi/v1/vip/register/`,
        method: 'POST',
        data: body
    })
}

export function requestUpdateUser(body: {
    id: number,
    password: string,
    mail: string,
    birthday: string
}) {
    return request({
        url: `/realApi/v1/vip/update/`,
        method: 'POST',
        data: body
    })
}

export function requestDeleteUser(params: {
    id: number,
}) {
    return request({
        url: `/realApi/v1/vip/info/`,
        method: 'DELETE',
        params
    })
}

export function requestChargeUser(body: {
    id: number,
    money: number
}) {
    return request({
        url: `/realApi/v1/vip/recharge/`,
        method: 'POST',
        data: body
    })
}

export function requestGetUserReview() {
    return request({
        url: '/realApi/v1/vip/review/',
        method: 'GET',
    })
}