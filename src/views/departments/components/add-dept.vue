<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="dialogVisible" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="formdata" label-width="120px" :model="formData" :rules="relus">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimples">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentsAPI, getEmployeeSimple, addDepartments, updateDepartments } from '@/api'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNodes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 部门编码
    const codeValidator = async(rules, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isdepts = true
      if (this.formData.id) {
        isdepts =
          depts.some((item) => item.id !== this.formData.id &&
            item.code === value)
      } else { isdepts = depts.some((item) => item.code === value) }

      isdepts ? callback(new Error(`${value}部门编码已存在`)) : callback()
      // 问题 编辑模式下跟自己作比较
      //  解决 移除自己，不跟自己比较
    }
    // 名字重复校验
    const nameValidator = async(rules, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isdepartmentName = null
      if (this.formData.id) {
        // 同级别
        // const a = depts.filter(item => item.pid === this.treeNodes.pid && item.id !== this.treeNodes.id)
        // console.log(9, a)
        isdepartmentName = depts.filter(item => item.pid === this.treeNodes.pid && item.id !== this.treeNodes.id).some(item => item.name === value)
      } else {
        isdepartmentName = depts.filter(item => item.pid === this.treeNodes.id).some(item => item.name === value)
      }
      isdepartmentName ? callback(new Error(`${value}部门已存在`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      relus: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameValidator, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async submit() {
      try {
        // 验证表单是否通过
        await this.$refs.formdata.validate()
        // loading变成true
        this.loading = true
        // 调用接口
        this.formData.id ? await updateDepartments(this.formData) : await addDepartments({ ...this.formData, pid: this.treeNodes.id })
        this.$message.success(`${this.formData.id ? '编辑' : '新增'}成功`)
        // 重新渲染
        this.$parent.getDepartments()
        // 关闭弹窗
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 获取人员列表
    async getEmployeeSimples() {
      const res = await getEmployeeSimple()
      this.peoples = res
    },
    // 关闭初始form表单
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.formdata.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    }
  }
}
</script>

<style>

</style>
