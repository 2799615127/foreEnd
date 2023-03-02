import jwtDecode from 'jwt-decode'
//用户功能组件

/**
 * 解析jwt令牌
 * @returns {*}
 */
const userName =()=>{
    return jwtDecode(localStorage.getItem('token')).content
}
export default userName