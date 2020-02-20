<template>
  <div class="item-body" @click="seeDetail(itemData.id)">
    <div class="user-img">
      <el-avatar shape="square" :size="30" :src="itemData.author.avatar_url" :key="itemData.author.avatar_url" :alt="itemData.author.loginname"></el-avatar>
    </div>
    <div class="reply-count">
      <span class="count-of-replies" title="回复数">{{itemData.reply_count}}</span>
      <span>/</span>
      <span class="count-of-visits" title="点击数">{{itemData.visit_count}}</span>
    </div>
    <div class="topic-tab" :style="{'width': !itemData.top && itemData.tab === 'dev' ? '' : '40px'}">
      <el-tag effect="dark" :type="itemData.top ? 'danger' : 'success'">
        {{itemData.top ? '置顶' : itemData.tab === 'good' ? '精华' : itemData.tab === 'share' ? '分享' : itemData.tab === 'ask' ? '问答' : itemData.tab === 'job' ? '招聘' : itemData.tab === 'dev' ? '客户端测试' : '全部'}}
      </el-tag>
    </div>
    <div class="topic-title" :title="itemData.title" :style="{'width': !itemData.top && itemData.tab === 'dev' ? '' : 'calc(100% - 40px - 40px - 80px - 90px)'}">{{itemData.title}}</div>
    <div class="created-time">{{$formatDate(itemData.create_at, 'yyyy-MM-dd')}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      itemData: Object
    },
    methods: {
      seeDetail (id) {
        this.$emit('seeDetail', id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item-body {
    height: 50px;
    border-bottom: 1px solid #f0f0f0;
    .user-img {
      margin: 10px;
      margin-right: 0px;
      width: 30px;
      height: 30px;
      float: left;
    }
    .reply-count,.topic-tab,.topic-title,.created-time {
      height: 50px;
      margin-top: -2px;
      line-height: 50px;
      float: left;
    }
    .reply-count {
      width: 80px;
      font-size: 12px;
      text-align: center;
      .count-of-replies {
        color: #9e78c0;
      }
      .count-of-visits {
        color: #b4b4b4;
      }
    }
    .topic-tab {
      width: 80px;
    }
    .topic-title {
      width: calc(100% - 40px - 80px - 80px - 90px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .created-time {
      width: 80px;
      text-align: right;
      margin-right: 10px;
      font-size: 14px;
      color: #b4b4b4;
    }
    clear: both;
  }
  .item-body:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
</style>