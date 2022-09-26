import request from '@/utils/request'

export function login(data) {

}
// 用户资料
export const getInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 获取员工基本信息
export const getUserInfo = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {
}
