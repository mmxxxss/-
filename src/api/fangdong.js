import Taro from "@tarojs/taro";
const service = (path, params = {}, method = "get") => {
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
export const goFangDongLogin = (data) => {
    return service(`/fangdong/login?username=${data.username}&password=${data.password}`)
}
export const goUserLogin = (data) => {
    return service(`/user/login?username=${data.username}&password=${data.password}`)
}