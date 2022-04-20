/*
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-17 11:41:33
 */
import request from '../utils/request';

export default {
    requestActList(page, limit) {
        return request({
            url: 'agent/api/activity',
            method: 'GET',
            params: {
                page,
                limit,
            }
        }).catch(err => console.log(err));
    },
    requestPostAct(form) {
        return request({
            url: 'agent/api/activity',
            method: 'POST',
            data: form
        }).catch(err => console.log(err));
    },
    requestPutAct(form) {
        return request({
            url: 'agent/api/activity',
            method: 'PUT',
            data: form
        }).catch(err => console.log(err));
    },
    requestDelAct(params) {
        return request({
            url: 'agent/api/activity',
            method: 'DELETE',
            params: params,
        }).catch(err => console.log(err));
    }
}