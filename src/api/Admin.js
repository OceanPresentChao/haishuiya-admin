/*
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-17 11:41:33
 */
import request from '../utils/request';

export default {
    requestLogin(userInfo) {
        return request({
            url: 'agent/api/login',
            method: 'POST',
            params: {
                userInfo: userInfo
            }
        }).catch(err => console.log(err));
    }
}