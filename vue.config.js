const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭ESList的语法检查
  devServer:{
    // proxy:'http://gmall-h5-api.atguigu.cn'
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
