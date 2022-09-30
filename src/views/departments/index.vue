<template>
  <div class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" @addDept="handleAddDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true" @node-click="handleNodeClick">
      <treeTools slot-scope="{data}" :tree-node="data" @addDept="handleAddDept" />
    </el-tree>
    <adddept :dialog-visible.sync="dialogVisible" :tree-nodes="curerntNode" /></div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartmentsAPI } from '@/api'
import { tranListToTreeData } from '@/utils'
import adddept from './components/add-dept.vue'
export default {
  label: 'HrsaasIndex',
  components: { treeTools, adddept },
  data() {
    return {
      company: { },
      departs: [],
      defaultProps: {
        label: 'name'
      },
      dialogVisible: false,
      curerntNode: {}
    }
  },

  created() {

  },
  mounted() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getDepartments() {
      const { depts, companyManage, companyName } = await getDepartmentsAPI()
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    handleAddDept(treeNode) {
      this.dialogVisible = true
      this.curerntNode = treeNode
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      padding-right: 50px;
    }
  }
}
</style>
