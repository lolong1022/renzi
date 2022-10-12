<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/EmployeeSimple'
// import { threadId } from 'worker_threads'
export default {
  methods: {
    async  onSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const res = []
      results.map(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
        res.push(userInfo)
      })
      //   调用全部导入接口
      await importEmployee(res)
      this.$message.success('导入成功')
      this.$router.back()
    }
  }
}

</script>

<style lang='stylus' scoped>

</style>
