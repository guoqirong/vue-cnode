<template>
  <div class="detail-body" v-loading="loadData">
    <div class="lift-content">
      <el-card class="box-card">
        <div slot="header" class="card-title">
          <el-page-header @back="goBack" content="话题详情"></el-page-header>
        </div>
        <span class="my-topic-title">
          <div class="topic-title">
            <div class="title-left">
              <div class="topic-title-tab" :style="{'width': !topic.top && topic.tab === 'dev' ? '' : '40px'}">
                <el-tag effect="dark" :type="topic.top ? 'danger' : 'success'">
                  {{topic.top ? '置顶' : topic.tab === 'good' ? '精华' : topic.tab === 'share' ? '分享' : topic.tab === 'ask' ? '问答' : topic.tab === 'job' ? '招聘' : topic.tab === 'dev' ? '客户端测试' : '全部'}}
                </el-tag>
              </div>
              <div class="title-name" :style="{'width': !topic.top && topic.tab === 'dev' ? '' : 'calc(100% - 40px)'}">{{topic.title}}</div>
              <div class="topic-title-desc">{{'● ' +$formatDate((topic.create_at || ''), 'yyyy-MM-dd') + ' ● ' + (topic.author && topic.author.loginname ? topic.author.loginname : '')}}</div>
            </div>
            <div class="title-right">
              <el-button @click="collectClick" type="warning" :icon="topic.is_collect ? 'el-icon-star-on' : 'el-icon-star-off'" circle plain size="small"></el-button>
            </div>
          </div>
          <div class="topic-content" v-html="topic.content"></div>
        </span>
      </el-card>
      <el-card class="box-card" v-if="topic.replies && topic.replies.length > 0">
        <div slot="header" class="card-replies-title">
          <span>回复</span>
        </div>
        <div v-for="(item, i) in topic.replies" :key="i" class="replie-item">
          <div class="replie-user-img">
            <el-avatar shape="square" :size="40" :src="item.author.avatar_url"></el-avatar>
          </div>
          <div class="replie-title">{{item.author.loginname + '回复了您的话题'}}</div>
          <div class="replie-desc">{{$formatDate(item.create_at, 'yyyy-MM-dd')}}</div>
          <div class="replie-content" v-html="item.content"></div>
        </div>
      </el-card>
    </div>
    <div class="right-content">
      <el-card class="box-card">
        <div slot="header" class="card-title">
          <span>作者</span>
        </div>
        <div class="author">
          <div class="author-img">
            <el-avatar shape="square" :size="40" :src="topic.author && topic.author.avatar_url ? topic.author.avatar_url : ''" :key="topic.author && topic.author.avatar_url ? topic.author.avatar_url : ''" :alt="topic.author && topic.author.loginname ? topic.author.loginname : ''"></el-avatar>
          </div>
          <div class="author-name">{{topic.author && topic.author.loginname ? topic.author.loginname : ''}}</div>
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
        mdrender: true,
        tabKey: '',
        topic: {}
      };
    },
    mounted () {
      // document.title = '111' // 标题设置
      this.tabKey = this.$route.query.key
      this.getData(this.$route.query.id)
    },
    methods: {
      goBack () {
        this.$bus.$emit('selectTabKey', this.tabKey)
        this.$router.go(-1)
      },
      getData (id) {
        this.id = id || ''
        this.loadData = true
        this.$httpRequest ({
          url: this.$httpRequest.adornUrl(`/api/v1/topic/${id}`),
          method: 'get',
          params: {
            mdrender: this.mdrender,
            accesstoken: localStorage.getItem('token') || ''
          }
        }).then(({data}) => {
          this.loadData = false
          data.data.content = this.imgContent(data.data.content)
          data.data.replies.forEach(item => {
            item.content = this.imgContent(item.content)
          });
          this.topic = data.data
        }).catch(e => {
          this.$message.error('请求失败')
          console.error(e)
        })
      },
      imgContent (content) {
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
        str = str.replace(/“|”/g, '"')
        str = str.replace(/href="+(\/.?user.?\/|user.?\/)/g, 'href="./#/user/')
        str = str.replace(/&lt;/g, '<')
        return str.replace(/&gt;/g, '>')
      },
      collectClick () {
        if (this.topic.is_collect) {
          this.topicDeCollect()
        } else {
          this.topicCollect()
        }
      },
      topicCollect () {
        this.$httpRequest ({
          url: this.$httpRequest.adornUrl(`/api/v1/topic_collect/collect`),
          method: 'post',
          data: {
            topic_id: this.topic.id,
            accesstoken: localStorage.getItem('token') || ''
          }
        }).then(({data}) => {
          this.topic.is_collect = true
        }).catch(e => {
          this.$message.error('请求失败')
          console.error(e)
        })
      },
      topicDeCollect () {
        this.$httpRequest ({
          url: this.$httpRequest.adornUrl(`/api/v1/topic_collect/de_collect`),
          method: 'post',
          data: {
            topic_id: this.topic.id,
            accesstoken: localStorage.getItem('token') || ''
          }
        }).then(({data}) => {
          this.topic.is_collect = false
        }).catch(e => {
          this.$message.error('请求失败')
          console.error(e)
        })
      }
    }
  }
</script>

<style lang="scss">
  .detail-body {
    width: 90%;
    min-height: calc(100vh - 100px);
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
            .el-page-header {
              height: 40px;
              line-height: 40px;
              .el-page-header__content {
                font-size: 14px;
              }
            }
          }
          .card-replies-title {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
          }
        }
        .el-card__body {
          padding-top: 0px;
          .my-topic-title {
            .topic-title {
              float: left;
              width: 100%;
              border-bottom: 1px solid #e5e5e5;
              margin-bottom: 8px;
              .title-left {
                width: calc(100% - 40px);
                float: left;
                .topic-title-tab {
                  padding-top: 4px;
                  width: 80px;
                  float: left;
                }
                .title-name {
                  width: calc(100% - 80px);
                  font-size: 20px;
                  font-weight: bold;
                  float: right;
                }
                .topic-title-desc {
                  clear: both;
                  font-size: 12px;
                  color: #838383;
                  margin-bottom: 14px;
                }
              }
              .title-right {
                width: 40px;
                float: right;
              }
              .topic-content {
                clear: both;
              }
            }
          }
          .replie-item {
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 8px;
            .replie-user-img {
              margin: 5px;
              width: 40px;
              height: 40px;
              float: left;
            }
            .replie-title {
              width: calc(100% - 50px);
              float: left;
              font-size: 18px;
              font-weight: bold;
              height: 30px;
              line-height: 30px;
            }
            .replie-desc {
              width: calc(100% - 50px);
              float: left;
              font-size: 12px;
              color: #b4b4b4;
            }
            .replie-content {
              clear: both;
            }
          }
        }
      }
    }
    .right-content {
      float: right;
      width: 290px;
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
        .author {
          height: 40px;
          .author-img {
            width: 40px;
            margin-right: 10px;
            float: left;
          }
          .author-name {
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