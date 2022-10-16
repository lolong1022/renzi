import request from '@/utils/request'

/**
 *  获取员工的简单列表
 * **/
export function getEmployeeInfoAPI() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/** *
 *  封装一个导入员工的接口
 *
 * ***/

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetailAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** *
 * 获取用户的岗位信息 -
 *return promise
 *(id) -- 员工的id
 *  **/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}
/** *
 * 保存用户的岗位信息 -
 *return promise
 *(id) -- 员工的id
 *  **/
export function saveJobDetail(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'PUT',
    data
  })
}
