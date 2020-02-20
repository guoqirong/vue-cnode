<template>
  <div class="body-box">
    <div class="navbar">
      <div class="navbar-content">
        <span class="navbar-logo" @click="gotoIndex">
          <img src="../../assets/images/logo.svg" />
        </span>
        <span class="navbar-link navbar-noright-link">
          <span><el-link :underline="false" @click="gotoIndex">首页</el-link></span>
          <span v-if="token !== ''">
            <el-badge v-if="count > 0" :value="count" class="badge-item">
              <el-link :underline="false" @click="gotoMessage">消息</el-link>
            </el-badge>
            <el-link v-else :underline="false" @click="gotoMessage">消息</el-link>
          </span>
          <span v-if="token !== ''"><el-link :underline="false" @click="gotoCollect">收藏</el-link></span>
          <span><el-link :underline="false" href="https://github.com/guoqirong/vue-cnode" target="_blank">GitHub仓库</el-link></span>
          <span v-if="token === ''"><el-link :underline="false" @click="gotoLogin">登录</el-link></span>
          <span v-if="token !== ''"><el-link :underline="false" @click="logout">退出</el-link></span>
        </span>
      </div>
    </div>
    <div class="body-content">
      <router-view/>
    </div>
    <el-backtop :bottom="90"></el-backtop>
    <div class="body-footer">
      <div class="footer-content">
        <div>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</div>
        <div>CNode 社区版权归xxxxxx所有</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    computed: {
      token: {
        get () { return this.$store.state.user.token }
      }
    },
    mounted() {
      this.$store.commit('user/updateToken', localStorage.getItem('token') || '')
      if (localStorage.getItem('token')) {
          this.$httpRequest ({
            url: this.$httpRequest.adornUrl(`/api/v1/message/count`),
            method: 'get',
            params: {
              accesstoken: localStorage.getItem('token') || ''
            }
          }).then(({data}) => {
            this.count = data.data
          }).catch(e => {
            console.error(e)
          })
        }
    },
    methods: {
      gotoIndex () {
        if (this.$route.path !== '/index') {
          this.$router.push({
            path: '/'
          })
        }
      },
      gotoMessage () {
        if (this.$route.path !== '/message') {
          this.$router.push({
            path: '/message'
          })
        }
      },
      gotoCollect () {
        if (this.$route.path !== '/collect') {
          this.$router.push({
            path: '/collect'
          })
        }
      },
      gotoLogin () {
        if (this.$route.path !== '/login') {
          this.$router.push({
            path: '/login'
          })
        }
      },
      logout () {
        this.token = ''
        localStorage.removeItem('userData')
        localStorage.removeItem('token')
        this.gotoIndex()
        location.reload()
      }
    }
  }
</script>

<style lang="scss">
  .body-box {
    .navbar {
      margin-bottom: 0;
      z-index: 9;
      width: 100%;
      position: relative;
      background: #444;
      font-size: 13px;
      .navbar-content {
        border: none;
        box-shadow: none;
        width: 90%;
        margin: auto;
        padding: 5px;
        .navbar-logo {
          width: 120px;
          display: inline-block;
          padding: 3px 10px;
          height: 34px;
          line-height: 34px;
          img {
            width: 100%;
          }
        }
        @media only screen and (max-width: 520px) {
          .navbar-noright-link {
            float: none!important;
          }
        } 
        .navbar-link {
          width: calc(100% - 180px);
          min-width: 300px;
          text-align: right;
          height: 38px;
          line-height: 38px;
          float: right;
          padding-right: 20px;
          span {
            margin: 0 4px;
            .el-link {
              color: #cccccc;
            }.el-link:hover {
              color: white;
            }
          }
          .badge-item {
            .el-badge__content {
              margin-top: 10px;
              border: 0px;
            }
          }
        }
      }
    }
    .body-content {
      width: 100%;
    }
    @media only screen and (max-width: 950px) {
      .body-footer {
        visibility: hidden!important;
      }
    } 
    .body-footer {
      clear: both;
      width: 100%;
      height: 82px;
      background-color: white;
      color: #ababab;
      .footer-content {
        width: 90%;
        margin: 0px auto;
        padding: 20px 0px;
        text-align: center;
      }
    }
  }
</style>