import Vue from 'vue';
// element 完整引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
// 按需引入
// 按需引入的组件分为两种情况
import 'element-ui/lib/theme-chalk/index.css';
import { Button, MessageBox, Message } from 'element-ui';
// 大多数组件通过 Vue.component 或 Vue.use 可以使用
Vue.component(Button.name, Button); // --> Vue.use(Button)
// 只有少部分组件需要挂载Vue的原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;