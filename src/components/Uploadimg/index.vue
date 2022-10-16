<template>
  <div>
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="onHttpRequest"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="previewDialog" width="50%">
      <span>
        <img width="100%" :src="previewImgUrl">
      </span>
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDQhnhNDpFaieOuBF6j7HEwObkeJjz2rRo',
  SecretKey: 'EEynQq32qRpyvfDXjwwbAboofTAg6UuG'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [
        // { name: 'default', url: 'https://kimi-hr-1313544680.cos.ap-nanjing.myqcloud.com/%E7%8C%AB%E7%8C%AB1.jpeg' }
      ],
      previewDialog: false,
      previewImgUrl: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.previewImgUrl = file.url
      this.previewDialog = true
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      // 限制图片类型
      const imgType = ['image/jpeg', 'image/png']
      const flag = imgType.includes(file.type)
      if (!flag) {
        this.$message.error('只能上传' + imgType.join('/') + '类型文件')
        return false
      }
      // 限制上传大小
      const imgSize = 1 * 1024 * 1024
      if (file.size > imgSize) {
        this.$message.error('上传图片大小不能超过1mb')
        return false
      }
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'hr-cb-1314348463', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // err 上传失败的信息，如果上传成功的话，err为null
        // data 上传成功的信息
        // console.log(err || data)
        if (err) return this.$message.error('上传失败')
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.uploadImg{
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>
