const MODE = import.meta.env.MODE // 环境变量

export const baseUrl = MODE == 'development' ? 'http://106.15.78.110:7001' : 'http://106.15.78.110:7001'