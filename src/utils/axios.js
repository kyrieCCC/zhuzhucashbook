import axios from 'axios'
import { Toast } from 'zarm'

const MODE = import.meta.env.MODE

// axios.defaults.baseURL = MODE == 'development' ? '/api' : 'http://localhost:7001'
axios.defaults.baseURL = 'http://106.15.78.110:7001'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Toast.show('服务端出现异常，请稍后再试')
        return Promise.reject(res)
    }
    if (res.data.code != 200) {
        if (res.data.msg) {
            const result = res.data.msg
            // Toast.show(res.data.msg)
            console.log(result)
            Toast.show(result)
        }
        // 充当路由守卫，当我们的token过期的时候，会自动跳到login页提醒重新登录
        if (res.data.code == 401) {
            window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios