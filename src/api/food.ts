import request from '@/utils/request';

export function requestGetFoodList() {
    return request({
        url: `/realApi/v1/food/info/`,
        method: 'GET',
    })
}

export function requestCreateFood(body: {
    type: string,
    name: string,
    price: number,
    memo: string
}) {
    return request({
        url: `/realApi/v1/food/info/`,
        method: 'POST',
        data: body
    })
}

export function requestUpdateFood(body: {
    id: number,
    type: string,
    name: string,
    price: number,
    dealamount: number,
    memo: string
}) {
    return request({
        url: `/realApi/v1/food/info/`,
        method: 'PUT',
        data: body
    })
}

export function requestDeleteFood(params: {
    id: number,
}) {
    return request({
        url: `/realApi/v1/food/info/`,
        method: 'DELETE',
        params
    })
}

export function requestGetFoodCategories() {
    return request({
        url: `/realApi/v1/food/type/`,
        method: 'GET',
    })
}

export function requestCreateFoodCategory(body: { title: string }) {
    return request({
        url: `/realApi/v1/food/type/`,
        method: 'POST',
        data: body
    })
}


export function requestDeleteFoodCategory(params: { id: number }) {
    return request({
        url: `/realApi/v1/food/type/`,
        method: 'DELETE',
        params
    })
}

