import request from '@/utils/request'
export const getRoleListAPI = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
/** *
 * 新增角色
 * ***/
export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
// 删除人员列表
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 公司信息
export const componyInfo = (componyId) => {
  return request({
    url: `/company/${componyId}`
  })
}
