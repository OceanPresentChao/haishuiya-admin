import request from '@/utils/request';

export function requestGetPressList(params: { limit: number, page: number, s_name: string }) {
    return request({
        url: '/realApi/v1/press/info/',
        method: 'GET',
        params
    })
}

export function requestCreatePress(body: { name: string }) {
    return request({
        url: '/realApi/v1/press/info/',
        method: 'POST',
        data: body
    })
}

export function requestUpdatePress(body: { name: string, id: number }) {
    return request({
        url: '/realApi/v1/press/info/',
        method: 'PUT',
        data: body
    })
}
export function requestUpdatePressShow(body: { show: number, id: number }) {
    return request({
        url: '/realApi/v1/press/show/',
        method: 'PUT',
        data: body
    })
}
export function requestDeletePress(params: { id: number }) {
    return request({
        url: '/realApi/v1/press/info/',
        method: 'DELETE',
        params
    })
}

export function requestGetBook(params: { id: number }) {
    return request({
        url: '/realApi/v1/book/info/',
        method: 'GET',
        params
    })
}

export function requestGetBookList(params: {
    limit: number,
    page: number,
    s_name?: string,
    s_categoryIds?: string,
    s_pressId?: number,
    s_isShow?: boolean,
}) {
    return request({
        url: '/realApi/v1/book/list/',
        method: 'GET',
        params
    })
}

export function requestGetShareBookList(params: {
    limit: number,
    page: number,
    s_name?: string,
    s_categoryIds?: string,
    s_pressId?: number,
    s_isShow?: boolean,
}) {
    return request({
        url: '/realApi/v1/share/book/list/',
        method: 'GET',
        params
    })
}

export function requestGetBookCategories(params: Object = {}) {
    return request({
        url: '/realApi/v1/book/category/',
        method: 'GET',
        params
    })
}

export function requestGetBookReview() {
    return request({
        url: '/realApi/v1/book/review/',
        method: 'GET',
    })
}

export function requestDeleteBook(params: { id: number }) {
    return request({
        url: '/realApi/v1/book/info/',
        method: 'DELETE',
        params
    })
}

export function requestUpdateBookShow(body: { show: number, id: number }) {
    return request({
        url: '/realApi/v1/book/show/',
        method: 'PUT',
        data: body
    })
}

export function requestCreateBook(body: { name: string, categoryId: number, pressId: number, author: string, desc: string, pubDate: string, version: number, page: number, price: number, isShow: number }) {
    return request({
        url: '/realApi/v1/book/info/',
        method: 'POST',
        data: body
    })
}

export function requestUpdateBook(body: { id: number, name: string, categoryId: number, pressId: number, author: string, desc: string, pubDate: string, version: number, page: number, price: number, isShow: number }) {
    return request({
        url: '/realApi/v1/book/info/',
        method: 'PUT',
        data: body
    })
}