import api from '../utils/apiAuthService'
import Cookies from './CookieService'

const AuthService = {
  login: async (request) => {
    try {
      await api.post('/auth/login', {
        'provider_name': 'facebook',
        'provider_id': request.userID,
        'accessToken': request.accessToken,
        'role' : 4
      })
        .then(respons => {
          console.log('callback')
          if (respons) {
            Cookies.setCookie('tokenJWT', respons.data.token)
            Cookies.setCookie('wip_Id', respons.data.wip_id)
            console.log(respons.data)
            location.reload(true)
          } else {
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  

}

export default AuthService