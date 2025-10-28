import Taro from "@tarojs/taro";
const service = (path, params, method) => {
    const token = Taro.getStorageSync('frontToken')
    return new Promise((resolve, reject) => {
        Taro.request({
            url: "http://localhost:8080/zufangguanli" + path,
            data: params,
            method,
            header: `Token:${token}`,
            success(res) {
                resolve(res.data);
            },
            fail(err) {
                reject(err);
            },
        });
    })
}
export const goZuKeLogin = (data) => {
    return service(`/zuke/login?username=${data.username}&password=${data.password}`, "post")
}