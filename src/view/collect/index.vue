<template>
  <div class="my-message">
    <div class="lift-content">
      <el-card class="box-card" v-loading="loadData">
        <div slot="header" class="card-title">
          <span>我的收藏</span>
        </div>
        <div>
          <span v-if="collect.length > 0">
            <div v-for="(item, i) in collect" :key="i">
              <list-item :itemData="item" @seeDetail="seeDetail"></list-item>
            </div>
          </span>
          <div v-else class="is-notdata">暂无数据</div>
        </div>
      </el-card>
    </div>
    <div class="right-content">
      <el-card class="box-card" v-if="!userData">
        <span class="not-login">
          <div class="title">
            CNode：Node.js专业中文社区 
          </div>
          <div class="describe">
            <span class="not-bottom">当前为游客状态，您可以</span>
            <el-link :underline="false" @click="gotoLogin">登录</el-link> 
          </div>
        </span>
      </el-card>
      <el-card class="box-card" v-if="userData">
        <div slot="header" class="card-title">
          <span>个人信息</span>
        </div>
        <div class="user">
          <div class="user-img">
            <el-avatar shape="square" :size="40" :src="userData.avatar_url || ''" :key="userData.avatar_url || ''" :alt="userData.loginname || ''"></el-avatar>
          </div>
          <div class="user-name">{{userData.loginname || ''}}</div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="card-title">
          <span>客户端二维码</span>
        </div>
        <el-image style="width: 248px; height: 248px" src="https://static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU" fit="fit"></el-image>
        <div class="client-box">
          <el-link :underline="false" href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</el-link> 
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import listItem from '../../components/listItem'
  export default {
    data() {
      return {
        loadData: false,
        token: '',
        userData: '',
        collect: []
      };
    },
    components: {
      listItem
    },
    mounted () {
      this.$nextTick(() => {
        this.token = localStorage.getItem('token') || ''
        this.userData = JSON.parse(localStorage.getItem('userData'))
        this.getData()
      })
    },
    methods: {
      getData() {
        if (this.userData && this.userData.loginname) {
          this.loadData = true
          this.$httpRequest ({
            url: this.$httpRequest.adornUrl(`/api/v1/topic_collect/${this.userData.loginname}`),
            method: 'get'
          }).then(({data}) => {
            this.loadData = false
            this.collect = data.data
          }).catch(e => {
            this.$message.error('请求失败')
            console.error(e)
          })
        }
      },
      seeDetail (id) {
        this.$router.push({
          path: `/index-detail`,
          query: {
            id: id,
            key: this.tab
          }
        })
      },
      gotoLogin () {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-message {
    width: 90%;
    margin: 10px auto;
    @media only screen and (max-width: 950px) {
      .lift-content {
        z-index: 16;
        width: 100%!important;
      }
      .right-content {
        visibility: hidden!important;
        width: 0px!important;
      }
    } 
    .lift-content {
      float: left;
      width: calc(100% - 300px);
      .box-card {
        margin-bottom: 10px;
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
          padding: 0;
          .is-notdata {
            font-size: 12px;
            margin: 20px;
          }
        }
      }
    }
    .right-content {
      float: right;
      width: 290px;
      .box-card {
        margin-bottom: 10px;
        .not-login {
          .describe {
            margin-top: 20px;
            font-size: 14px;
            .not-bottom {
              display: inline-block;
              height: 20px;
              line-height: 20px;
            }
            .el-link {
              margin-top: -3px;
            }
          }
        }
        .el-card__header {
          padding: 8px 20px;
          padding-bottom: 0;
          .card-title {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
          }
        }
        .user {
          height: 60px;
          .user-img {
            width: 40px;
            margin-right: 10px;
            float: left;
          }
          .user-name {
            width: calc(100% - 50px);
            font-size: 18px;
            float: left;
          }
        }
        .client-box {
          width: 100%;
          .el-link {
            display: inline-block;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
</style>