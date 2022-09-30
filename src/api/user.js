import request from '@/utils/request'

/**
 * 获取用户基本资料
 * @returns
 */
export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function getUserBasicInfoAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
