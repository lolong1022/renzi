import layout from '@/layout'
export default {
  path: '/attendances',
  component: layout,
  children: [
    {
      path: '/attendances',
      name: 'attendances',

      component: () => import('@/views/yemian/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
