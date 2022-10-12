<template>
  <div>
    approvals
    <UploadExcel :on-success="onSuccess" />

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
    onSuccess(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
