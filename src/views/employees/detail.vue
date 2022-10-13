<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登陆个人设置" name="first">
            <el-form ref="accountInfoForm" label-width="80px" :model="accountFrom" :rules="rules">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountFrom.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountFrom.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second">
            <userInfo />
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third">
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserBasicInfoAPI, saveUserDetailById } from '@/api/user'
import userInfo from './components/userInfo.vue'
import jobInfo from './components/jobInfo.vue'
import Cookies from 'js-cookie'
export default {
  components: { userInfo, jobInfo },
  data() {
    return {
      accountFrom: {},
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 2, max: 8, message: '姓名长度2到8位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' }
        ]
      },
      activeName: Cookies.get('activeName') || 'first'
    }
  },
  created() {
    this.getUserBasicInfo()
  },
  methods: {
    // tab栏切换
    tabClick() {
      Cookies.set('activeName', this.activeName)
    },
    // 点击更改用户信息
    async updateEmployees() {
      try {
        await this.$refs.accountInfoForm.validate()
        await saveUserDetailById(this.accountFrom)
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 点击的呢个人信息
    async getUserBasicInfo() {
      console.log(this.$route.params.id)
      const res = await getUserBasicInfoAPI(this.$route.params.id)
      this.accountFrom = res
    }
  }
}

</script>

<style lang='stylus' scoped>

</style>
