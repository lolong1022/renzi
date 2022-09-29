<template>
  <el-dialog
    :title="formData.id?'编辑角色':'新增角色'"
    width="50%"
    :visible="diaVisible"
    @close="delDiaVisible"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formData"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[
          {required:true,message:'角色不能为空',trigger:'blur'}
        ]"
      >
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="delDiaVisible">取 消</el-button>
      <el-button v-loading="loading" type="primary" @click="addrolus">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRoleAPI, updateRole } from '@/api/setting'
export default {
  props: {
    diaVisible: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
    delDiaVisible() {
      this.$emit('update:dia-visible', false)
      this.$refs.roleDialogForm.resetFields()
      // 初始的数据变成空值
      this.formData = {
        name: '',
        description: ''
      }
    },
    // 新增人员和编辑人员
    async addrolus() {
      try {
        // from表单校验符合
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.formData.id ? await updateRole(this.formData) : await addRoleAPI(this.formData)
        this.$message.success(this.formData.id ? '编辑成功' : '添加成功')

        this.$emit('refershRander')
        this.delDiaVisible()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}

</script>

<style lang='stylus' scoped>

</style>
