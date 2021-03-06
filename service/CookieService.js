import Cookies from 'js-cookie'

const CookiesService = {
  setCookie (name, value) {
    Cookies.set(name, value)
  },
  getCookie (name) {
    return Cookies.get(name)
  },
  gettokenJWTCookie () {
    return Cookies.get('tokenJWT')
  },
  getRole () {
    return Cookies.get('role')
  },
  getWipId () {
    return Cookies.get('wip_Id')
  },
  getName () {
    return Cookies.get('name')
  },
  getEmailCookie () {
    return Cookies.get('email')
  },
  removeJWTAndEmailCookie () {
    Cookies.remove('tokenJWT')
    Cookies.remove('wip_Id')
  }
}
export default CookiesService
