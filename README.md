# vue-cnode

> cnode vue pc浏览器版

## 效果图

![首页1](https://github.com/guoqirong/vue-cnode/blob/master/demo-screenshot/index1.png)

![首页2](https://github.com/guoqirong/vue-cnode/blob/master/demo-screenshot/index1.png)

![详情](https://github.com/guoqirong/vue-cnode/blob/master/demo-screenshot/detail.png)

![消息](https://github.com/guoqirong/vue-cnode/blob/master/demo-screenshot/message.png)

![收藏](https://github.com/guoqirong/vue-cnode/blob/master/demo-screenshot/collect.png)

![登录](https://github.com/guoqirong/vue-cnode/blob/master/demo-screenshot/login.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 目录结构

```
.
├── build  项目构建配置文件
├── config  项目构建配置项
├── demo-screenshot  项目效果图
└── src
    ├── assets  静态资源
    │   ├── images  图片资源
    │   ├── style  公用样式
    ├── components 公用组件
    ├── router  路由配置
    ├── store  状态管理
    ├── utils  工具类方法
    └── views  模块文件
        ├── collect  收藏
        ├── detail  详情
        ├── index  首页
        ├── login  登录
        ├── message  消息
        └── topic  主题
```