import layout from '@/layout'
export default {
  path: '/permission',
  component: layout,
  children: [
    {
      path: '/permission',
      name: 'permission',

      component: () => import('@/views/yemian/permission'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
