<template>
  <div class="login-box">
    <el-card class="box-card">
      <div slot="header" class="card-title">
        <span>登录</span>
      </div>
      <span>
        <el-form class="login-form" :model="form" :rules="rules" ref="form" label-width="0px">
          <el-form-item prop="token">
            <el-input v-model="form.token" placeholder="accesstoken 登录校验" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-button type="primary" @click="onSubmit" style="width: 100%" :loading="loadData">登录</el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="onCancel" style="width: 100%" :loading="loadData">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </span>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loadData: false,
        form: {
          token: ''
        },
        rules: {
          token: [
            { required: true, message: '请输入token校验', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      onSubmit () {
        this.loadData = true
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$httpRequest ({
              url: this.$httpRequest.adornUrl(`/api/v1/accesstoken`),
              method: 'post',
              data: {
                accesstoken: this.form.token
              }
            }).then(({data}) => {
              this.loadData = false
              localStorage.setItem('userData', JSON.stringify(data))
              localStorage.setItem('token', this.form.token)
              this.$store.commit('user/updateToken', this.form.token)
              this.$router.go(-1)
            }).catch(e => {
              this.loadData = false
              this.$message.error('登录失败')
              console.error(e)
            })
          } else {
            return false;
          }
        });
      },
      onCancel () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss">
  .login-box {
    width: 90%;
    margin: 10px auto;
    .box-card {
      margin-bottom: 10px;
      height: calc(100vh - 154px);
      .el-card__header {
        padding: 8px 20px;
        padding-bottom: 0;
        .card-title {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
        }
      }
      .el-card__body {
        .login-form {
          width: 50%;
          min-width: 200px;
          margin: 20px auto;
        }
      }
    }
  }
</style>