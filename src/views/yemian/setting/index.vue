<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row>
            <el-button size="small" icon="el-icon-plus" type="primary" @click="addRolus">新增角色</el-button>
          </el-row>
          <el-table
            :data="rowList"
            style="width: 100%"
          >
            <el-table-column
              v-loading="loading"
              label="序号"
              width="180"
              type="index"
            />
            <el-table-column
              label="角色名称"
              width="240"
              prop="name"
            />
            <el-table-column
              label="描述"
              name="description"
            />
            <el-table-column
              label="操作"
              width="240"
            >
              <template slot-scope="{ row }">
                <el-button size="small" type="success">分配权限asdf</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRoles(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row
            type="flex"
            justify="end"
            align="middle"
            height:60px
          >
            <el-pagination
              v-if="total>0"
              background
              layout="prev, pager, next,sizes"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,5,10,15]"
              :total="total"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>

        </el-tab-pane>
        <!-- 公司信息 -->
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="componyInfos.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="componyInfos.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="componyInfos.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="componyInfos.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addroles ref="editRoles" :dia-visible.sync="diaVisible" @refershRander="getRoleList" />
  </div>
</template>

<script>

import addroles from './component/addroles.vue'
import { getRoleListAPI, deleteRole, componyInfo } from '@/api/setting'
export default {
  name: 'HrsaasIndex',
  components: {
    addroles
  },

  data() {
    return {
      activeName: 'first',
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10
      },
      total: 0, // 记录总数
      rowList: [],
      loading: false,
      diaVisible: false,
      componyInfos: {}
    }
  },
  mounted() {
    this.getRoleList()
    this.componyInfoAPI()
  },

  methods: {
    // 公司信息
    async componyInfoAPI() {
      const data = await componyInfo(this.$store.getters.companyId)
      this.componyInfos = data
    },
    // 删除人员
    async delRoles(id) {
      try {
        await this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用删除的请求
        await deleteRole(id)
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑人员·
    editRole(row) {
      this.$refs.editRoles.formData = { ...row }
      // 回显数据
      this.diaVisible = true
    },
    // 调用请求获得员工列表
    addRolus() {
      this.diaVisible = true
    },
    // 获得人员列表
    async getRoleList() {
      try {
        const { rows, total } = await getRoleListAPI(this.page)
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRoleList()
        }
        console.log(124, rows, total)
        this.loading = true
        this.rowList = rows
        this.total = total
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
