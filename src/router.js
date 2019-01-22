import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "Index" */ '@/views/login');
const Index = () => import(/* webpackChunkName: "Index" */ '@/views/index');
const IndexMain = () => import(/* webpackChunkName: "Index" */ '@/views/index/main');
const Blog = () => import(/* webpackChunkName: "Blog" */ '@/views/blog');
const BlogMain = () => import(/* webpackChunkName: "BlogMain" */ '@/views/blog/main');
const BlogEdit = () => import(/* webpackChunkName: "BlogEdit" */ '@/views/blog/edit');
const Examine = () => import(/* webpackChunkName: "Examine" */ '@/views/examine');
const ExamineMain = () => import(/* webpackChunkName: "ExamineMain" */ '@/views/examine/main');
const Configure = () => import(/* webpackChunkName: "Configure" */ '@/views/configure');
const ConfigureMain = () => import(/* webpackChunkName: "ConfigureMain" */ '@/views/configure/main');

// Error
const Error = () => import(/* webpackChunkName: "Error" */ '@/components/Error');

Vue.use(Router);

// ps:
// 有子路由的情况，路由name不设置
export default new Router({
  // mode: 'history',
  routes: [

    // 登录
    {path: '/', name: 'Login', component: Login, meta: {title: '登录'}},

    // 控制面板
    {
      path: '/admin', name: 'Index', component: Index, meta: {title: '控制面板', isShow: true}, children:
        [
          {path: '/', name: 'IndexMain', component: IndexMain, meta: {title: '监控台', isShow: true, icon: 'el-icon-menu'}},

          // 博客
          {
            path: 'blog', name: 'Blog', component: Blog, meta: {title: '博客', isShow: true, icon: 'el-icon-tickets'}, children:
              [
                {path: '/', name: 'BlogMain', component: BlogMain, meta: {title: '博客列表', isShow: true}}, // 草稿
                {path: 'edit', name: 'BlogEdit', component: BlogEdit, meta: {title: '编辑博客', isShow: true}}, // 添加、修改
              ]
          },

          // 留言评论
          {
            path: 'examine', name: 'Examine', component: Examine, meta: {title: '审核', isShow: true, icon: 'el-icon-edit-outline'}, children:
              [
                {path: '/', name: 'ExamineMain', component: ExamineMain, meta: {title: '列表', isShow: true}}, // 留言、评论审核
              ]
          },

          // 配置
          {
            path: 'configure', name: 'Configure', component: Configure, meta: {title: '配置', isShow: true, icon: 'el-icon-setting'}, children:
              [
                {path: '/', name: 'ConfigureMain', component: ConfigureMain, meta: {title: '配置首页', isShow: true}}, // 标签、网备、友链
              ]
          },
        ]
    },

    // 错误提示页
    {path: '/error', name: 'Error', component: Error, meta: {title: '错误提示'}},

    // 重定向
    {path: '*', redirect: '/error'},

  ]
})


