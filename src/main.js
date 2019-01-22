// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from './assets/js/axios'
import Tool from './assets/js/tool'
import {
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Button,
  Form,
  FormItem,
  Input,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  TabPane,
  Progress,
  Select,
  Option,
  Pagination,
  CheckboxGroup,
  Checkbox,
  DatePicker,
  Switch,
  Message
} from 'element-ui';

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(TabPane);
Vue.use(Progress);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.prototype.$message = Message;
Vue.config.productionTip = false;
Vue.prototype.$Axios = Axios;
Vue.prototype.$Tool = Tool;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
