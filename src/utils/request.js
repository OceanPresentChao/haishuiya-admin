/*
 * @Author: OceanPresent
 * @E-mail: oceanpresent@163.com
 * @Date: 2022-03-17 10:39:05
 */
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from './auth';
// import { useAdminStore } from '@/stores/admin';
// const adminStore = useAdminStore()
// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['OPToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(response.headers);
    // if the custom code is not 20000, it is judged as an error.
    if (response.status == 200) {
      if (res.code !== 20000 && res.code !== 200 && response.headers.haishuiya) {
        ElMessage({
          message: res.message || 'Error:Code非200',
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
      if (response.status === 501) {
        const router = useRouter()
        router.push({ path: '/login' })
      }
      ElMessage({
        message: res.message || 'Error:Status非200',
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