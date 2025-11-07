const tool = {
    isEmail(s) {
        if (!s) return true
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
    },
    isMobile(s) {
        if (!s) return true
        return /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]|17[01345678]|18[0-9]|14[579]|19[0-35-9])[0-9]{8}$/.test(s)
    },
}
export default tool