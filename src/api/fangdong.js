// 房东api
import service from "../utils/service";
// 登录
export const goFangDongLogin = (data) => {
    return service(`/fangdong/login?username=${data.username}&password=${data.password}`)
}
// 注册
export const goFangDongRegister = (data) => {
    return service(`/fangdong/register`, data, "post")
}