<template>
  <div class="app-container">
    <PageTools>
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="addExcl">导出</el-button>
        <el-button size="small" type="primary" @click="handEmployess">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="employeeList">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatter" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">
            {{ row.timeOfEntry|formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{row}">
            <el-switch
              :value="row.enableState===1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="getDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next,total,sizes"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,3,10]"
          :total="total"
          @current-change="getEmployeeLists"
          @size-change="getEmployeeLists"
        />
      </el-row>
    </el-card>
    <addemployee :dislo-visable.sync="disloVisable" />
  </div>
</template>

<script>
import EmployeeSimple from '@/api/constant/employees'
import addemployee from './components/addemployee.vue'
import { getEmployeeList } from '@/api'
import { delEmployee } from '@/api/EmployeeSimple'
export default {
  name: 'HrsaasIndex',
  components: {
    addemployee
  },
  data() {
    return {
      isshowLeft: false,
      page: {
        page: 1, // 当前页码
        size: 10
      },
      employeeList: [],
      total: 0,
      loading: false,
      employeeSimple: EmployeeSimple.hireType,
      disloVisable: false
    }
  },
  mounted() {
    this.getEmployeeLists()
  },
  methods: {
    // 跳转detail
    getDetail(row) {
      // console.log(11, row)
      this.$router.push('/employees/detail/' + row.id)
    },
    // 转换成excl
    async addExcl() {
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const header = ['手机号', '姓名', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const exportMap = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const data = rows.map(item => {
        return header.map(el => {
          if (el === '聘用形式') {
            // 查找employeeSimple 里面的id是否跟rows里面聘用形式 返回结果一样
            const find = this.employeeSimple.find(hiro => hiro.id === item[exportMap[el]])
            return find ? find.value : '未知'
          }
          return item[exportMap[el]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: 'excel-list', // 非必填
        autoWidth: true, // 宽度自适应非必填
        bookType: 'xlsx' // 非必填
      })
    },
    // 删除
    async del(id) {
      console.log(id)
      await this.$confirm('是否删除？', '提示', {
        type: 'warning'
      })
      await delEmployee(id)
      this.getEmployeeLists()
    },
    // 点击新增
    handEmployess() {
      this.disloVisable = true
    },

    // 员工详细信息
    async getEmployeeLists() {
      try {
        this.loading = true
        // 调用接口
        const { rows, total } = await getEmployeeList(this.page)
        this.employeeList = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    // 转换文本格式
    formatter(row, colum, cellValue) {
      const res = this.employeeSimple.find(ele => ele.id === cellValue)
      return res?.value || '非正式'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
