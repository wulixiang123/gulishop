# 1. 说明
vee-validate是专门用来做表单验证的vue插件
我们当前用的是2.x的版本,  最新的4.x版本适配vue3,  3.x版本使用比较麻烦
github地址:       https://github.com/logaretm/vee-validate
内置校验规则:   https://github.com/logaretm/vee-validate/tree/v2/src/rules
中文messages: https://github.com/logaretm/vee-validate/blob/v2/locale/zh_CN.js

# 2. 使用

## 1). 引入
```javascript
下载: npm install -S vee-validate@2.2.15  

引入插件:
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
```

## 2). 基本使用
```javascript
单独验证(注意: name必须指定,验证时需要的是哪个字段,参考的就是name值)
<input v-model="mobile" name="phone" v-validate="{required: true,regex: /^1\d{10}$/}" 
    :class="{invalid: errors.has('phone')}">
<span class="error-msg">{{ errors.first('phone') }}</span>

整体验证  在点击完成注册的是由对所有的表单项进行验证
const success = await this.$validator.validateAll() // 对所有表单项进行验证,验证通过返回true
```

> 问题: 提示文本默认都是英文的

## 3). 提示文本信息本地化

```javascript
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文message

VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`  // 修改内置规则的message
    },
    attributes: { // 给校验的field属性名映射中文名称
        phone: '手机号',
        code: '验证码',
    }
})
```

> 完整中文message源码:  https://github.com/logaretm/vee-validate/blob/v2/locale/zh_CN.js

## 4). 自定义验证规则

```javascript
VeeValidate.Validator.extend('agree', {
    // 验证函数需要自己写,返回true代表验证通过,返回false代表没通过,value对应input输入框的值
    validate: value => {
        return value
    },
    // 获取错误信息,自定义的,field对应的是验证的字符
    getMessage: field => field + '必须同意'
})
```

