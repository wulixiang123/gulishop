# vue2-组件通信(非常重要)

gitee地址: https://gitee.com/newsegmentfault/vue2-communication_220731

## props

props 父子组件间的通信,父给子传参

传参分为函数类型和非函数类型

* 非函数类型

  * 基本数据类型: 子组件不能修改父组件传过来的数据
  * 引用数据类型: 子组件不能修改父组件传过来的引用数据类型地址,可以改里面的属性(但是不推荐,违反了**单项数据流**)

* 函数数据类型

  传函数的目的是为了子组件调用修改父组件的数据



props接收方式(3种):

* 数组

  ```js
  props: ['count', 'userinfo', 'changeCount'],
  ```

* 对象

  ```js
  props: {
      count: Number,
      userinfo: Object,
      changeCount: Function
  },
  ```

* 配置对象

  ```js
  props: {
      count: {
          type: Number,
          required: true, // 必填
          default: 4 // 默认值
          // required 和 default 是互斥的,如果必填还设置默认值没有意义
      },
      userinfo: {
          type: Object,
          default () {
                  return {
                      name: '老六',
                      age: 22
                  }
              }
          },
      changeCount: {
          type: Function,
          required: true
      }
  },
  ```





## 自定义事件

事件分为 原生事件 和 自定义事件

原生事件
1. 事件类型 - click - 在原生事件中,事件类型一定是有限个数
2. 触发机制 - 浏览器触发的,触发的时候会给函数传一个事件对象,事件对象是浏览器生成的

  原生事件关于$event

  函数不加小括号 - 默认系统触发原生事件的时候,第一个参数是 事件对象

  函数加小括号 - 加小括号的时候,如果需要事件对象必须使用 $event (底层上是当前这个函数外部套了一层函数,套的这个函数形参是$event,我们用的就是这个形参)

自定义事件 - 父子组件之间的通信,子给父传参
1. 事件类型 - changeCount - 自定义事件是给组件绑定的,自己定义的,名字自己取,有无限个数
2. 触发机制 - 自己触发的,参数需要自己传递,没有事件对象,使用$emit触发

      ```js
      $emit('changeCount', 9)
      参数一:触发的事件类型  参数二: 传递的参数
      ```

      自定义事件关于$event

      函数不加小括号 - 触发的函数中的参数直接是 $emit 传过来的数据

      函数加小括号 - 自定义事件是没有事件对象的,$event变成了子组件传过来的参数





## 全局事件总线

全局事件总线 - 跨组件之间的通信

1. 安装总线

   ```js
   new Vue({
       beforeCreate() {
           Vue.prototype.$bus = this; // 安装总线
       },
   }
   ```

2. 接收数据

   在接收数据的组件中,绑定事件,留下回调,接收参数

   `this.$bus.$on('receiveParams', this.receiveParams)`

3. 发送数据

   在发送数据的组件中,触发事件,传递参数

   `this.$bus.$emit('receiveParams', 25)`





## v-model

之前用在表单元素上,双向数据绑定,用来收集表达数据,现在可以给组件使用 `v-model` 指令,但是组件的 `v-model` 指令需要自己实现,步骤如下

步骤:

1. `v-model` 用于表单数据的收集，是双向数据绑定，我们能不能不用 `v-model` 实现 `input元素` 双向数据绑定 ?

   `<input type="text" :value="keyword" @input="keyword = $event.target.value">`

2. 步骤1中 使用了两个条件实现了表单 v-model 指令

   * 绑定value值
   * 触发input事件

   所以我们猜想：组件要想实现 `v-model` 指令，也需要实现这两个条件

3. 组件调用

   `<CustomInput :value="keyword" @input="keyword = $event"></CustomInput>`

   组件实现

   ```html
   <template>
       <div class="box">
           <h3>子组件</h3>
           <div>父组件传过来的keyword: {{ value }}</div>
           <input type="text" :value="value" @input="changeValue">
       </div>
   </template>
   
   <script>
   export default {
       name: "CustomInput",
       props: ['value'],
       methods: {
           changeValue(e) {
               this.$emit('input', e.target.value);
           }
       }
   };
   </script>
   ```

   在这个过程中,`CustomInput` 组件中的 `input` 内容发生改变,同时父组件的数据也会变化,数据具体的流向如下:

   1. 通过:value把数据绑定给子组件
   2. 子组件中使用props接收父组件传过来的数据
   3. 修改数据,使用$emit触发自定义事件,把参数传递给父组件
   4. 父组件接收到数据之后,更新keyword的值
   5. keyword值更新之后,又重新通过:value传递给子组件

4. 我们已经在子组件中实现了这两个条件

   * 绑定value值
   * 触发input事件

   那么现在让我们把 `CustomInput` 组件刚刚绑定的这两个条件替换成 `v-model` 指令，发现真的可以使用 v-model 指令



结论：

组件使用 v-model 条件: 必须实现两个条件  1. 绑定value值  2.绑定input事件

什么情况下会使用v-model?

封装组件的时候,组件中有表单元素的时候一般会使用 v-model

在哪见过?

在element ui 中的 el-input 组件使用的就是 v-model





## sync

.sync 用于组件,父子组件间的数据同步

步骤:

1. 不通过 v-model 能不能实现父子组件之间的数据同步呢?

   可以,代码尝试

   ```html
   <Child1 :msg="string" @changeMsg="changeMsg"></Child1>
   ```

   Child1组件

   ```html
   <template>
       <div class="box">
           <h3>Child1</h3>
           <div>父组件传过来的数据 msg: {{ msg }}</div>
           <button @click="changeParentMsg">修改父组件传过来的数据</button>
       </div>
   </template>
   
   <script>
   export default {
       name: "Child1",
       props: ['msg'],
       methods: {
           changeParentMsg() {
               this.$emit('changeMsg', "我爱你,高圆圆")
           }
       }
   }
   </script>
   ```

   数据的流向:

   1. 通过:msg把数据传给子组件

   2. 子组件修改数据,$emit 触发了事件把参数传给父组件,父组件修改数据

   3. 父组件更改msg,再通过 :msg 传给子组件,进行展示

   

2. 将实现的步骤1做一个小改动

   ```html
   <Child1 :msg="string" @update:msg="changeMsg"></Child1>
   ```

   Child1组件

   ```html
   <template>
       <div class="box">
           <h3>Child1</h3>
           <div>父组件传过来的数据 msg: {{ msg }}</div>
           <button @click="changeParentMsg">修改父组件传过来的数据</button>
       </div>
   </template>
   
   <script>
   export default {
       name: "Child1",
       props: ['msg'],
       methods: {
           changeParentMsg() {
               this.$emit('update:msg', "我爱你,高圆圆")
           }
       }
   }
   </script>
   ```

   这里使用了 自定义事件`update:msg` 替换了 自定义事件`changeMsg`

3. 此时让组件使用 .sync 修饰符尝试

   `<Child1 :msg.sync="string"></Child1>`

   发现已经可以实现父子组件见的数据同步了

结论:

使用 sync 条件: 必须实现 1. :xxx   2. @update:xxx

> 注意:
>
> 这里的第二个条件的自定义事件必须是 update: 开头

在哪见过?

在element ui中的对话框dialog中见过

使用场景(主要是区别v-model)

* v-model 在封装表单元素的时候实现父子组件数据同步,经常使用v-model
* .sync 在封装非表单元素的组件时候实现父子组件数据同步,经常使用.sync





## $attrs与$listeners

通过需求来学习 $attrs 和 $listeners

需求: 自定义带Hover提示的按钮(封装组件的意义是通用)

思考：

对element ui 组件进行二次封装的时候,把element里面的每个属性往外一个一个暴露,很累

尝试:

* $attrs

  $attrs 可以接收到绑定在组件上的所有属性,除去props接收过的属性、style、class类名

  在使用的时候使用 v-bind="$attrs" 直接将这个对象绑定到组件上即可

  > 注意
  >
  > v-bind不能写成 :

* $listeners

  $listeners 可以接收到所有绑定在组件上的事件

  在使用的时候使用 v-on="$listeners" 直接将这个对象绑定到组件上即可

  > 注意
  >
  > v-on 不能简写成 @





## ref-children-parent

$refs 可以获取到组件实例,拿到组件实例可以拿到组件中的数据

$children 当前组件的所有子组件,得到的是一个数组

$parent 获取当前组件的父组件

结论: 只要可以获取到当前的组件实例,就可以获取到数据,修改数据

> 注意: 这里不推荐使用 $parent, 为什么?
>
> 因为父组件不确定是谁

详情参见代码





## mixin

mixin 是混入

混入的概念就是将一段代码混入到另一段代码中

步骤:

1. 创建一个 `mixin.js `文件,暴露一个对象,这个对象就是vue的配置对象(vue组件中能配置什么,这里就能配置什么)

   ```js
   export default {
       data() {
           return {
               msg: '我爱你',
           }
       },
       ...... // vue能配置的,这里都可以配置
   }
   ```

2. 使用:

   ```js
   import abc from './mixin'
   export default {
   	mixins: [abc], // 混入的配置项
   }
   ```



结论:

在mixin中配置的内容(内容包括但不限于数据,方法等),都可以混入到组件当中

如果在组件中有重复的内容,会发生覆盖,组件中的内容会覆盖混入的内容

> 注意:
>
> 钩子函数不会被覆盖,先执行mixin中的钩子,再执行组件中的钩子





## Provide、Inject

Provide、Inject 用户祖先组件和后代组件之间进行通信

provide 理解成祖先组件的广播(广播数据)

inject 理解成用后代组件来收听广播的(接收数据)

写法:

* 祖先组件

  ```js
  data() {
      return {
          content1: "jack",
          content2: {
              name: "tom",
          },
      };
  },
  provide() {
      return {
          content1: this.content1,
          content2: this.content2,
          changeContent1: this.changeContent1,
          changeContent2: this.changeContent2
      }
  },
  methods: {
      changeContent1() {
          this.content1 = 'jerry';
      },
      changeContent2() {
          // this.content2 = { // 修改后代无法接收到改变
          //     name: 'tony'
          // }
  
          this.content2.name = 'tony'; // 修改后代可以接收到改变
      }
  },
  ```

* 后代组件

  ```js
  data() {
      return {}
  },
  inject: ['content1', 'content2', 'changeContent1', 'changeContent2']
  ```



结论:

广播只广播一次,当数据发生改变的时候,后代组件当中接收不到更新的信息(包含基本数据类型和引用数据类型的地址)

> 注意:  在使用引用数据类型的时候,对象中的属性发生改变,后代组件是可以接收到的





## vuex

### 基本使用

使用步骤:

1. 安装

   `npm  i  vuex@3 -S`

2. 引入

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   Vue.use(Vuex)
   ```

3. 暴露

   ```js
   export default new Vuex.Store({ state, mutations, actions, getters, modules })
   ```

4. 创建vm的时候,关联store

   ```js
   import store from '@/store'
   new Vue({
       render: h => h(App),
       store
   }).$mount('#app')
   ```



使用场景:

多个组件依赖同一数据的时候使用 vuex, 例如说: 一般情况下用户信息会放在store中

### 进阶使用

#### 模块化

配置 modules

只要开启模块化,state中的数据就是加了一层,而mutations、actions、getters和之前的使用方式一样

* state

  ```js
  普通写法   $store.state.test.count
  
  辅助函数 - 往computed中映射
  ...mapState({
      count: state => state.test.count
  })
  ```

* actions

  ```js
  普通写法   $store.dispath('increment')
  
  辅助函数 - 往methods中映射
  ...mapActions(['increment']) 
  ```

  > mutaions的写法和actions几乎相同
  >
  > ```js
  > 普通写法   $store.commit('SETINCREMENT')
  > 
  > 辅助函数 - 往methods中映射
  > ...mapMutaions(['increment']) 
  > ```

* getters

  ```js
  普通写法   $store.getters.dblCount
  
  辅助函数 - 往compouted中映射
  ...mapGetters(['dblCount'])
  ```

#### 命名空间

在模块化的每个store当中配置 `namespaced: true` , 和state、mutations、actions、getters同级

变化：state和开启模块化的时候一样,mutations、actions、getters都多加了一层

* state - 还是开启模块化的写法

* actions

  ```js
  普通写法    $store.dispatch('test/increment')
  
  辅助函数
  ...mapActions('test', ['increment'])
  ```

* getters

  ```js
  普通写法    $store.getters['test/dblCount']
  
  辅助函数
  ...mapGetters('test', ['dblCount'])
  ```



## slot - 插槽

### 介绍

* 什么是插槽?

  在模板中开一个槽,这个槽用来接收html内容

  插槽也是父子组件间的一种通信方式,用来传递html、css

  之前在组件标签之间写的任何内容都没啥用，当使用插槽的时候,组件标签之间的的内容会被传递到子组件

* 为甚要有插槽?

  当需要父组件决定子组件中的某一块内容的时候,就可以使用插槽

* 插槽怎么玩?

  插槽总共分为三类,普通插槽、具名插槽、作用域插槽

### 分类

#### 普通插槽

在子组件中写一个slot标签,这个标签就是开的槽

slot标签中如果有内容,默认渲染.如果父组件传html、css了,那么显示父组件传过来的内容

子组件

```html
<slot>内娱塌方了</slot>
```

父组件

```html
<Child1>
    <strong class="cont">那个谁塌房了</strong>
</Child1>
```

注意: 以上是简写,全写如下

```html
<Child1>
    <template v-slot:default>
        <strong class="cont">那个谁塌房了</strong>
    </template>
</Child1>
```

#### 具名插槽

具有名称的插槽

当子组件中有多个 slot ,默认插槽的内容会填充给每一个 slot ,此时重复了

我们期望的是每一个 slot ,传进去的内容是不一样的,此时给插槽起个名字

子组件

```html
<slot name="qwer"></slot>
```

父组件

```html
<template v-slot:qwer>
    内娱完了
</template>
```

这里相当于给子组件开的槽,slot起了个名字叫 qwer

父组件在给这个槽去传递html、css的时候,需要使用 v-slot: 后面跟给这个插槽起的名字

v-slot:qwer 中v-slot指令是可以缩写的  --->  #qwer

> 这里的 v-slot: 简写成了#

#### 作用域插槽 - 数据

插槽还是原来的插槽,但是涉及到了数据,子组件可以把自己的数据传给父组件的模板中

注意: 这个模板是即将放到当前插槽的模板

子组件

```html
<slot name="user" :users="userinfo" :intro="intro"></slot>
```

> 注意:  slot标签上,绑定的属性会形成一个对象,而这个对象会在父组件中使用

父组件

```html
<template #user="abc">
    <div>{{ abc }}</div>
    <h5>姓名: {{ abc.users.name }}</h5>
    <h5>年龄: {{ abc.users.age }}</h5>
    <h5>介绍: {{ abc.intro }}</h5>
</template>

全写如下
<template v-slot:user="abc">
    ......
</template>
```

父组件中 v-slot:user="abc" 这里的abc就是子组件绑定在 slot 标签上传递过来的数据



注意:

当作用域插槽单独使用的时候,父组件模板中接收的数据的地方写法有以下两种

```js
#default="{ users, instro }"

v-slot="{ users, instro }"
```





## pubsub

使用步骤:

1. 安装

   `npm i pubsub-js`

2. 接收数据,接收数据的组件,绑定事件(订阅消息),留下回调,接收参数

   `Pubsub.subscribe('changeMessage', this.changeMessage)`

3. 传递出局,传递数据的组件,触发事件(发布消息),传递参数

   `Pubsub.publish('changeMessage')`

注意:  这里和总线唯一的区别在接收数据的函数中,参数一是消息类型
