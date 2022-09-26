<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="rules"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
        <el-form-item prop="mobile">
          <span class="svg-container el-icon-user-solid" />
          <el-input v-model="loginForm.mobile" />
        </el-form-item>
        <el-form-item v-model="loginForm.passwors" prop="password">
          <!-- <span class="svg-container el-icon-user-solid" /> -->
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="pwd" v-model="loginForm.password" :type="isShowPassword" />
          <span class="svg-container" @click="changPwd">
            <svg-icon :icon-class="isShowPassword==='password'?'eye':'eye-open'" />
          </span>
        <!-- <span class="svg-container el-icon-user-solid" /> -->
        </el-form-item>
      </div>

      <el-button class="loginBtn" :loading="loading" @click="login">登录</el-button>
      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
  <!-- 环境变量的作用
  1. 正常公司中 有几个环境 4 开发 dev 测试 test 预发 uat 线上 pro
  2. 在项目里如何配置这几个环境  通过 .env 配置 base api
  开发环境的接口前缀 /api
  线上环境的接口前缀 /prod-api
   -->
</template>
<script>
// import { loginAPI } from '@/api/login'
import { validPhone } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    // 定义自定义校验规则
    const phoneValid = (rule, value, callback) => {
      if (validPhone(value)) {
        callback()
      } else {
        callback(new Error('语法格式错误'))
      }
    }
    return {
      // 密码框type属性
      isShowPassword: 'password',
      // 表单数据对象
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loading: false,
      // 表单验证规则
      rules: {
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          {
            validator: phoneValid,
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { min: 6, max: 16, message: '密码格式不对', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    // 动态改变密码的框
    changPwd() {
      this.isShowPassword === 'password' ? this.isShowPassword = '' : this.isShowPassword = 'password'
      // 点击icon图标  数据更新之后调用  focus事件
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    // 点击登陆按钮并调用vuex中loginAction方法
    async login() {
      // await loginAPI({ mobile: '13800000002',
      //   password: '123456' })
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/loginAction', this.loginForm)
        // 路由跳转到首页
        this.$router.push('/')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#d2e5ff;
$light_gray:#68b0fe;
$cursor: #68b0fe;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
  }
  .el-form-item__error {
    color: #fff
  }
  .loginBtn {
    border:0;
    color:#fff;
    background: #407ffe;
    width: 100%;
    margin-bottom: 30px;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
