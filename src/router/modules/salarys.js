import layout from '@/layout'
export default {
  path: '/salarys',
  component: layout,
  children: [
    {
      path: '/salarys',
      name: 'salarys',

      component: () => import('@/views/yemian/salarys'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
