/*
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-17 10:39:05
 */
import axios from 'axios';
import { ElMessage } from 'element-plus';
// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status == 200) {
      if (res.code !== 20000 && res.code !== 200) {
        ElMessage({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000,
          center: true,
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        if (res.message) {
          ElMessage({
            message: res.message,
            type: 'success',
            duration: 5 * 1000,
            center: true,
          })
        }
        return res
      }
    } else {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
        center: true,
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    console.log('Axios err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
      center: true,
    })
    return Promise.reject(error)
  }
)
export default service