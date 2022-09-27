import layout from '@/layout'
export default {
  path: '/employees',
  component: layout,
  children: [
    {
      path: '/employees',
      name: 'employees',

      component: () => import('@/views/yemian/employees'),
      meta: { title: '员工 ', icon: 'people' }
    }
  ]
}
