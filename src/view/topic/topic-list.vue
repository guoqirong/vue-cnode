<template>
  <div v-loading="loadData" class="list-body">
    <div v-for="(item, i) in topicList" :key="i">
      <list-item :itemData="item" @seeDetail="seeDetail"></list-item>
    </div>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :pager-count="5"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
  import listItem from '../../components/listItem'
  export default {
    data() {
      return {
        loadData: false,
        page: 1,
        tab: '',
        limit: 20,
        mdrender: true,
        topicList: []
      }
    },
    components: {
      listItem
    },
    methods: {
      getData (key) {
        this.tab = key || 'all'
        this.loadData = true
        this.$httpRequest ({
          url: this.$httpRequest.adornUrl('/api/v1/topics'),
          method: 'get',
          params: {
            page: this.page,
            tab: this.tab,
            limit: this.limit,
            mdrender: this.mdrender
          }
        }).then(({data}) => {
          this.loadData = false
          this.topicList = data.data
        }).catch(e => {
          this.$message.error('请求失败')
          console.error(e)
        })
      },
      handleSizeChange(val) {
        this.limit = val;
        this.getData(this.tab)
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getData(this.tab)
      },
      seeDetail (id) {
        this.$router.push({
          path: `/index-detail`,
          query: {
            id: id,
            key: this.tab
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .list-body {
    min-height: 400px;
    .pagination {
      margin-top: 10px;
      white-space: normal;
    }
  }
</style>