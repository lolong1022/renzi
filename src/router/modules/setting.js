import layout from '@/layout'
export default {
  path: '/setting',
  component: layout,
  children: [
    {
      path: '/setting',
      name: 'setting',

      component: () => import('@/views/yemian/setting'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
