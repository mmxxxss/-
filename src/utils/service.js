import Taro from "@tarojs/taro";
const service = (path, params = {}, method = "get") => {
    const token = Taro.getStorageSync('token')
    return new Promise((resolve, reject) => {
        Taro.request({
            url: "http://localhost:8080/zufangguanli" + path,
            data: params,
            method,
            header: token ? {
                "Token": token,
                'Content-Type': 'application/json; charset=utf-8'
            } : {
                'Content-Type': 'application/json; charset=utf-8'
            },
            success(response) {
                if (response.data && response.data.code == 401) { // 401, token失效
                    Taro.removeStorageSync('token')
                    Taro.showToast({
                        title: response.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                    setTimeout(() => {
                        Taro.reLaunch({
                            url: '/pages/login/index',
                        })
                    }, 1000);
                    reject(response)
                }
                else if (response.data && response.data.code == 0) {
                    resolve(response.data)
                } else {
                    Taro.showToast({
                        title: response.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                    reject(response)
                }
            },
            fail(err) {
                reject(err);
            },
        });
    })
}
export default service