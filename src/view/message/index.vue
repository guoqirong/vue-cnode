<template>
  <div class="my-message">
    <div class="lift-content">
      <el-card class="box-card" v-loading="loadData">
        <div slot="header" class="card-title">
          <span>未读信息</span>
          <el-button class="all-read" @click="readAll">全部已读</el-button>
        </div>
        <div>
          <span v-if="message.hasnot_read_messages && message.hasnot_read_messages.length > 0">
            <div v-for="(item, i) in message.hasnot_read_messages" :key="i" class="notread-item">
              <div class="user-img">
                <el-avatar shape="square" :size="40" :src="item.author.avatar_url" :key="item.author.avatar_url" :alt="item.author.loginname"></el-avatar>
              </div>
              <div class="read-messages-title">
                <div class="title">{{item.author.loginname + '回复了您的话题'}}</div>
                <div class="desc">{{$formatDate(item.create_at, 'yyyy-MM-dd')}}</div>
              </div>
              <div class="read-btn"><el-button @click="readOne(item.id)">已读</el-button></div>
              <div class="reply-content" v-html="item.reply.content"></div>
              <div class="topic-title">话题：{{item.topic.title}}</div>
            </div>
          </span>
          <div v-else class="is-notdata">暂无数据</div>
        </div>
      </el-card>
      <el-card class="box-card" v-loading="loadData">
        <div slot="header" class="card-title">
          <span>已读信息</span>
        </div>
        <div>
          <span v-if="message.has_read_messages && message.has_read_messages.length > 0">
            <div v-for="(item, i) in message.has_read_messages" :key="i" class="read-item">
              <div class="user-img">
                <el-avatar shape="square" :size="40" :src="item.author.avatar_url" :key="item.author.avatar_url" :alt="item.author.loginname"></el-avatar>
              </div>
              <div class="read-messages-title">
                <div class="title">{{item.author.loginname + '回复了您的话题'}}</div>
                <div class="desc">{{$formatDate(item.create_at, 'yyyy-MM-dd')}}</div>
              </div>
              <div class="reply-content" v-html="item.reply.content"></div>
              <div class="topic-title">话题：{{item.topic.title}}</div>
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
  export default {
    data() {
      return {
        loadData: false,
        token: '',
        userData: '',
        message: {}
      };
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
        if (this.token) {
          this.loadData = true
          this.$httpRequest ({
            url: this.$httpRequest.adornUrl(`/api/v1/messages`),
            method: 'get',
            params: {
              accesstoken: this.token,
              mdrender: true
            }
          }).then(({data}) => {
            this.loadData = false
            data.data.has_read_messages.forEach(mitem => {
              mitem.reply.content = this.imgpContent(mitem.reply.content)
            });
            data.data.hasnot_read_messages.forEach(mitem => {
              mitem.reply.content = this.imgpContent(mitem.reply.content)
            });
            this.message = data.data
          }).catch(e => {
            this.$message.error('请求失败')
            console.error(e)
          })
        }
      },
      imgpContent (content) {
        let str = content
        // 匹配图片（g表示匹配所有结果i表示区分大小写）
        let imgReg = /<img.*?(?:>|\/>)/gi
        let arr = str.match(imgReg)
        if (arr && arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            let imgArr = arr[i].split(' ')
            let img = ''
            for (let key in imgArr) {
              if (key == 0) {
                img = imgArr[key] + ' style="width: 100%"'
              } else {
                img = img + ' ' + imgArr[key]
              }
            }
            str = str.replace(arr[i], img)
          }
        }
        // 匹配p标签（g表示匹配所有结果i表示区分大小写）
        let pReg = /<p.*?(?:>)/gi
        let arrp = str.match(pReg)
        if (arrp && arrp.length > 0) {
          for (let i = 0; i < arrp.length; i++) {
            let pArr = arrp[i].split('')
            let p = ''
            for (let key in pArr) {
              if (key == 1) {
                p = p + pArr[key] + ' style="word-wrap: break-word;word-break: break-all;"'
              } else {
                p = p + pArr[key]
              }
            }
            str = str.replace(arrp[i], p)
          }
        }
        return str
      },
      readAll () {
        this.$httpRequest ({
          url: this.$httpRequest.adornUrl(`/api/v1/message/mark_all`),
          method: 'post',
          params: {
            accesstoken: this.token
          }
        }).then(({data}) => {
          location.reload()
        }).catch(e => {
          this.$message.error('请求失败')
          console.error(e)
        })
      },
      readOne (id) {
        this.$httpRequest ({
          url: this.$httpRequest.adornUrl(`/api/v1/message/mark_one/${id}`),
          method: 'post',
          params: {
            accesstoken: this.token
          }
        }).then(({data}) => {
          location.reload()
        }).catch(e => {
          this.$message.error('请求失败')
          console.error(e)
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
            .all-read {
              margin-top: 2px;
              float: right;
            }
          }
        }
        .el-card__body {
          padding: 0;
          .notread-item,.read-item {
            padding: 10px 20px;
            border-bottom: 1px solid #f0f0f0;
            .user-img {
              margin-right: 10px;
              float: left;
            }
            .read-messages-title {
              float: left;
              .title {
                font-size: 18px;
                font-weight: bold;
              }
              .desc {
                font-size: 14px;
                color: #b4b4b4;
              }
            }
            .read-btn {
              margin-top: 6px;
              float: right;
            }
            .reply-content {
              clear: both;
            }
            .topic-title {
              background-color: #b4b4b4;
              padding: 4px;
            }
          }
          .notread-item {
            .user-img {
              width: 40px;
            }
            .read-messages-title {
              width: calc(100% - 60px - 50px);
            }
            .read-btn {
              width: 60px;
            }
          }
          .read-item {
            .user-img {
              width: 40px;
            }
            .read-messages-title {
              width: calc(100% - 50px);
            }
          }
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