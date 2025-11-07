import Taro from "@tarojs/taro";
const service = (path, params = {}, method = "get") => {
    const token = Taro.getStorageSync('token')
    console.log(token)
    return new Promise((resolve, reject) => {
        Taro.request({
            url: "http://localhost:8080/zufangguanli" + path,
            data: params,
            method,
            header: {
                "Token": token
            },
            success(res) {
                resolve(res.data);
            },
            fail(err) {
                reject(err);
            },
        });
    })
}
export default service