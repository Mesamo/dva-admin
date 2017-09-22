import request from '../utils/request'
import { apiPrefix } from '../utils/constants'

export async function getCards(params) {
  return request(`${apiPrefix}/cards`, params)
}

export async function getSales(params) {
  return request(`${apiPrefix}/sales`, params)
}
