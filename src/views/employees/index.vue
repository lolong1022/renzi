<template>
  <div>
    <pageTools>
      <template #before>
        <span>共计六条</span>
      </template>
      <template #after>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </template>
    </pageTools>

  </div>
</template>

<script>
export default {
  name: 'HrsaasIndex',

  data() {
    return {

    }
  },
  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
