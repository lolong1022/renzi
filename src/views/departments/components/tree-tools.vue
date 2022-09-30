<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px;width:100%;">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <span style="margin-right:8px">{{ treeNode.manager }}</span>
        <el-dropdown @command="handleCommand">
          <span>操作<i class="el-icon-arrow-down el-icon--right" /></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
            <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // add
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // edit
      } else {
        // del
      }
    }
  }
}
</script>

<style>

</style>
