import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @returns
 */
export function getRoleListAPI(params) {
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
export function updateRoleAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 获取公司信息
 * **/
export function getCompanyInfoAPI(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
