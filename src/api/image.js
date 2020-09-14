
import apiUrl from '../apiConfig'
import axios from 'axios'

export const imageCreate = (data, user) => {
  return axios({
    // headers: {
    //   'Authorization': `Token token=${user.token}`
    // },
    url: apiUrl + '/uploads',
    method: 'POST',
    data: data
  })
}

export const imageIndex = (data, user) => {
  return axios({
    // headers: {
    //   'Authorization': `Token token=${user.token}`
    // },
    url: apiUrl + '/uploads/',
    method: 'GET',
    data: data
  })
}
