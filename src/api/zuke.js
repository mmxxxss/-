// 租客api
import service from "../utils/service";
// 登录
export const goZuKeLogin = (data) => {
    return service(`/zuke/login?username=${data.username}&password=${data.password}`, {}, "post")
}
// 注册
export const goZuKeRegister = (data) => {
    return service(`/zuke/register`, data, "post")
}
