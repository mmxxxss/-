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
                    if (!token) {
                        Taro.showModal({
                            title: '提示',
                            content: '您好，您暂未登录，请先登录。',
                            success: function (res) {
                                if (res.confirm) {
                                    Taro.reLaunch({
                                        url: '/pages/login/index',
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                    Taro.removeStorageSync('token')
                    Taro.showModal({
                        title: '提示',
                        content: response.data.msg,
                        success: function (res) {
                            if (res.confirm) {
                                Taro.reLaunch({
                                    url: '/pages/login/index',
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
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