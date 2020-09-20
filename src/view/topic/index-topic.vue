<template>
  <div class="content-body">
    <div class="lift-content">
      <el-card class="box-card">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, i) in tabList" :key="i" :label="item.name" :name="item.key"></el-tab-pane>
            <topic-list ref="topicList"></topic-list>
          </el-tabs>
        </div>
      </el-card>
    </div>
    <div class="right-content">
      <el-card class="box-card" v-if="!userData" v-loading="loadData">
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
      <el-card class="box-card" v-if="userData" v-loading="loadData">
        <div slot="header" class="card-title">
          <span>个人信息</span>
        </div>
        <div class="user">
          <div class="user-img">
            <el-avatar shape="square" :size="40" :src="userData.avatar_url || ''" :key="userData.avatar_url || ''" :alt="userData.loginname || ''"></el-avatar>
          </div>
          <div class="user-name">{{userData.loginname || ''}}</div>
          <div class="user-score">积分：{{userData.score || ''}}</div>
        </div>
      </el-card>
      <el-card class="box-card list-card" v-if="userData" v-loading="loadData">
        <div slot="header" class="card-title">
          <span>我的主题</span>
        </div>
        <div v-for="(item, i) in userData.recent_topics" :key="i" class="recent_topics">
          <div :title="item.title">{{item.title}}</div>
        </div>
        <div v-if="userData.recent_topics && userData.recent_topics.length < 1" :key="i" class="recent_topics">
          <div>暂无数据</div>
        </div>
      </el-card>
      <el-card class="box-card list-card" v-if="userData" v-loading="loadData">
        <div slot="header" class="card-title">
          <span>我的回复</span>
        </div>
        <div v-for="(item, i) in userData.recent_replies" :key="i" class="recent_topics">
          <div :title="item.title">{{item.title}}</div>
        </div>
        <div v-if="userData.recent_replies && userData.recent_replies.length < 1" :key="i" class="recent_topics">
          <div>暂无数据</div>
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
  import topicList from '../topic/topic-list'
  export default {
    data() {
      return {
        activeName: 'all',
        tabList: [
          { key: 'all', name: '全部' },
          { key: 'good', name: '精华' },
          { key: 'share', name: '分享' },
          { key: 'ask',  name: '问答' },
          { key: 'job', name: '招聘' },
          { key: 'dev', name: '客户端测试' }
        ],
        loadData: false,
        token: '',
        userData: ''
      };
    },
    components: {
      topicList
    },
    mounted () {
      this.$bus.$on('selectTabKey', (bkey) => {
        if (bkey) {
          this.$store.commit('topic/updateTab', bkey)
        }
      })
      this.$nextTick(() => {
        this.activeName = this.$store.state.topic.tab || this.activeName
        this.$refs.topicList.getData(this.activeName)
        this.getData()
      })
    },
    beforeDestroy () {
      this.$bus.$off('selectTabKey')
    },
    methods: {
      getData () {
        this.token = localStorage.getItem('token') || ''
        let userName = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).loginname : ''
        if (this.token && userName) {
          this.loadData = true
          this.$httpRequest ({
            url: this.$httpRequest.adornUrl(`/api/v1/user/${userName}`),
            method: 'get'
          }).then(({data}) => {
            this.loadData = false
            this.userData = data.data
          }).catch(e => {
            this.$message.error('请求失败')
            console.error(e)
          })
        }
      },
      handleClick(tab) {
        this.$refs.topicList.getData(this.activeName)
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
  .content-body {
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
        .el-card__body {
          padding-top: 0px;
          .el-tabs__header {
            margin: 8px;
            margin-bottom: 0;
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
          .user-score {
            clear: both;
            font-size: 14px;
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
      .list-card {
        .el-card__body {
          padding: 0;
          .recent_topics {
            div {
              padding: 10px 20px;
              font-size: 12px;
              border-bottom: 1px solid #f0f0f0;
              width: calc(100% - 40px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>