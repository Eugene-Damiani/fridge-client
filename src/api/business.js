import apiUrl from '../apiConfig'
import axios from 'axios'

export const businessCreate = (business, user) => {
  return axios({
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/businesses',
    method: 'POST',
    data: {
      business: {
        name: business.name.toUpperCase(),
        address: business.address,
        state: business.state,
        zipCode: business.zipCode
      }
    }
  })
}

export const businessIndex = (business, user) => {
  return axios({
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/businesses/',
    method: 'GET',
    data: {
      business: {
        name: business.name,
        address: business.address,
        state: business.state,
        zipCode: business.zipCode
      }
    }
  })
}

export const show = (id, user) => {
  return axios({
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/businesses/' + id,
    method: 'GET'
  })
}

export const editBusiness = (id, user, business) => {
  return axios({
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/businesses/' + id,
    method: 'PATCH',
    data: {
      business: {
        name: business.name,
        address: business.address,
        state: business.state,
        zipCode: business.zipCode
      }
    }
  })
}
