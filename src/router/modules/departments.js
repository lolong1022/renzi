import layout from '@/layout'
export default {
  path: '/departments',
  component: layout,
  children: [
    {
      path: '/departments',
      name: 'departments',

      component: () => import('@/views/yemian/departments'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
