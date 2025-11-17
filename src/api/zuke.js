// 租客api
import service from "../utils/service";
import Taro from "@tarojs/taro";
// 登录
export const goZuKeLogin = (data) => {
    return service(`/zuke/login?username=${data.username}&password=${data.password}`, {}, "post")
}
// 注册
export const goZuKeRegister = (data) => {
    return service(`/zuke/register`, data, "post")
}
// 获取轮播图
export const getSwiperList = () => {
    return service(`/config/list?page=1&limit=3`, {}, "get")
}
// 获取房源信息推荐
export const getHouseList = (data) => {
    const token = Taro.getStorageSync('token')
    return service(`/fangyuanxinxi/autoSort${token ? 2 : ''}`, data, "get")
}