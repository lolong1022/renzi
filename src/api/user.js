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

/** *
 *  获取某个用户的基本信息
 *
 * ***/
export function getUserBasicInfoAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
