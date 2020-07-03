//路由功能函数
export function getRedirectTo(sex, header) {
    let path = ''
    //type
    if (sex === 'man') {
        path = "/man"
    } else {
        path = "/women"
    }
    //header
    if (!header) {
        path += "info"
    }
    return path
}