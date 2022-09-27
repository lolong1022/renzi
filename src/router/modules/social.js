import layout from '@/layout'
export default {
  path: '/social',
  component: layout,
  children: [
    {
      path: '/social',
      name: 'social',

      component: () => import('@/views/yemian/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
