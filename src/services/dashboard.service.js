import request from '../utils/request'

export async function getCards(params) {
  return request('/cards', params)
}

export async function getSales(params) {
  return request('/sales', params)
}
