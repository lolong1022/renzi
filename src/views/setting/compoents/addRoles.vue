<template>
  <div>
    <el-dialog :title="title" width="50%" :visible.sync="dialogVisible" :before-close="removeRoles">
      <el-form ref="roleDialogForm" label-width="80px" :model="formData">
        <el-form-item
          prop="name"
          label="角色"
          :rules="[{required: true,message:'角色必填',trigger:'blur'}]"
        >
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" row="3" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
        <el-button @click="removeRoles">取 消</el-button>
        <el-button v-loading="loading" @click="submit">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleAPI, updateRoleAPI } from '@/api'
export default {
  props: {
    dialogVisible: {
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
  computed: {
    title() {
      return this.formData.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    removeRoles() {
      this.$emit('update:dialog-visible', false)
      // 重置弹窗内容
      this.$refs.roleDialogForm.resetFields()
      // 不论是新增还是编辑都让初始值变成空值
      this.formData = {}
    },
    async submit() {
      try {
        // validate验证formData的校验规则，全部通过才会执行后续代码
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.formData.id ? await updateRoleAPI(this.formData) : await addRoleAPI(this.formData)
        this.$emit('refreshList')
        this.$message.success(this.formData.id ? '编辑成功' : '新增成功')
        this.removeRoles()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
