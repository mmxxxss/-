// 管理员api
import service from "../utils/service";
// 登录
export const goUserLogin = (data) => {
    return service(`/users/login?username=${data.username}&password=${data.password}`)
}