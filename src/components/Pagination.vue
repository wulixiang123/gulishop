<template>
    <div class="pagination">

      <div>pageTotal:{{ pageTotal }}</div>
      <div>start:{{ startEnd.start }} --- end:{{ startEnd.end }}</div>

      <button>上一页</button>
      <button>1</button>
      <button>...</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>···</button>
      <button>9</button>
      <button>上一页</button>
  
      <button style="margin-left: 30px">共 60 条</button>
    </div>
  </template>
  
  <script>
// 1. 静态搭建
// 2. 初始化数据展示
//    分析: 分页器需要哪些数据?
//    总条数  --  直接展示
//    每页条数  -- 用于计算
//    当前页 -- 高亮使用,计算使用
//    连续数 -- 连续展示几个数  一般是奇数3  5  7
//    注意: 这里的总页面我们通过计算得出    总页码 = 向上取整(总条数/每页条数)
// 3. 交互
  export default {
    name: "Pagination",
    props:{
      pageNo:{
        type:Number,
        required:true
      },
      pageSize:{
        type:Number,
        required:true
      },
      total:{
        type:Number,
        required:true
      },
      count:{
        type:Number,
        default:5
      }
    },
    computed:{
      pageTotal(){
        return Math.ceil(this.total / this.pageSize)
      },
      startEnd(){
        let { pageNo,pageSize,total,count,pageTotal } = this
        let start = 0
        let end = pageTotal
        if(pageTotal < count){
          start = 1
          end = pageTotal
        }else{
          start = pageNo - (count - 1) / 2
          end = pageNo + (count - 1) / 2
          if(start < 1){
            start = 1
            end = count
          }
          if(end < pageTotal){
            end = pageTotal
            start = pageTotal - count + 1
          }else{
            return {
              start,end
            }
          }
        }
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;
  
      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }
  
      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  </style>
  