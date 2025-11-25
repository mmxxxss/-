// 租客api
import service from "../utils/service";
import Taro from "@tarojs/taro";
// 登录
export const goZuKeLogin = (data) => {
    return service(`/zuke/login?username=${data.username}&password=${data.password}`, {}, "post")
}
// 会话保持
export const keepSession = () => {
    return service(`/zuke/session`, {}, "get")
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
// 获取发展历程
export const getDevelopList = (data) => {
    return service(`/aboutus/detail/1`, data, "get")
}
// 获取通知公告
export const getNoticeList = (data) => {
    return service(`/news/list`, data, "get")
}
// 获取网站介绍
export const getWebsiteInfo = (data) => {
    return service(`/systemintro/detail/1`, data, "get")
}
// 获取房屋咨询列表
export const getConsultationList = (data) => {
    return service(`/fangwuzixun/list`, data, "get")
}
// 获取房屋咨询详情
export const getConsultationDetail = (id) => {
    return service(`/fangwuzixun/detail/${id}`, {}, "get")
}
// 获取房源信息
export const getRoomList = (data) => {
    return service(`/fangyuanxinxi/list`, data, "get")
}
// 获取房源信息详情
export const getRoomDetail = (id) => {
    return service(`/fangyuanxinxi/detail/${id}`, {}, "get")
}
// 获取是否收藏
export const getIsCollect = (data) => {
    return service(`/storeup/list`, data, "get")
}
// 更新收藏显示
export const updateCollect = (data) => {
    return service(`/fangyuanxinxi/update`, data, "post")
}
// 收藏房源
export const addCollect = (data) => {
    return service(`/storeup/add`, data, "post")
}
// 取消收藏
export const delCollect = (data) => {
    return service(`/storeup/delete`, data, "post")
}