import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes =  [
  { path: '/', name: 'home', component: page('home') },

  { path: '/login', name: 'login', component: page('auth/login') },
  { path: '/register', name: 'register', component: page('auth/register') },
  { path: '/email/send', name: 'email.resend', component: page('auth/email/send') },
  { path: '/email/verify/:id', name: 'email.verify', component: page('auth/email/verify') },
  { path: '/password/reset', name: 'password.request', component: page('auth/password/email') },
  { path: '/password/reset/:token', name: 'password.reset', component: page('auth/password/reset') },

  { path: '/settings',
    component: page('settings/index'),
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: page('settings/profile') },
      { path: 'password', name: 'settings.password', component: page('settings/password') }
    ] },

  { path: '/admin', name: 'admin.dashboard', component: page('admin/index') },
  { path: '/admin/users', name: 'admin.users', component: page('admin/users') },
  { path: '/admin/permissions', name: 'admin.permissions', component: page('admin/permissions') },
  { path: '/admin/menu', name: 'admin.menu', component: page('admin/menus') },
  { path: '/admin/menu/:slug', name: 'admin.menu.slug', component: page('admin/menus') },
  { path: '/admin/taxonomy', name: 'admin.taxonomy', component: page('admin/taxonomy') },
  { path: '/admin/content', name: 'admin.content', component: page('admin/content') },
  { path: '/admin/content/:type', name: 'admin.content.type', component: page('admin/content') },
  { path: '/admin/content/:type/create', name: 'admin.content.create', component: page('admin/content') },
  { path: '/admin/content/:type/update/:id', name: 'admin.content.update', component: page('admin/content') },

  //Presentation pages
  { path: '/presentation/general-education-training', name: 'presentation.general-education-training', component: page('presentation/general-education-training') },
  { path: '/presentation/web-programming-materials', name: 'presentation.web-programming-materials', component: page('presentation/web-programming-materials') },
  { path: '/presentation/web-programming-materials', name: 'presentation.jquery', component: page('presentation/web-programming-materials') },

  { path: '/content/js-plugin/:slug', name: 'content.js-plugin', component: page('content/js-plugin') },
  { path: '/content/:type_slug/:slug', name: 'content', component: page('errors/404') },

  { path: '*', component: page('errors/404') }
]


export function createRouter () {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history'
  })
}