import layout from '@/layout'
export default {
  path: '/approvals',
  component: layout,
  children: [
    {
      path: '/approvals',
      name: 'approvals',
      component: () => import('@/views/yemian/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
