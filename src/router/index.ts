import { createRouter, createWebHashHistory } from 'vue-router';
// import routes from 'virtual:generated-pages';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// routes.push({
//   path: '/',
//   redirect: '/login',
// });

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('/@/layout/index.vue'),
    redirect: '/home',
    meta: {
      isKeepAlive: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('/@/views/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
];
// console.log(routes);

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory('fast-vue3'),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
