<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div class="before info">
          <i class="el-icon-info" />
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />

        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>

export default {
  name: 'PageTools',
  data() {
    return {

    }
  }
}
</script>
  <style lang='scss'>
   .page-tools {
      margin: 10px 0;
      .before {
        line-height: 34px;
        display: inline-block;
        border-radius: 3px;
        i {
          margin-right: 5px;
        }
        &.info {
          padding: 0px 10px;
          border: 1px solid rgba(145, 213, 255, 1);
          background: rgba(230, 247, 255, 1);
          i {
            color: #409eff;
          }
        }
      }
   }
  </style>

