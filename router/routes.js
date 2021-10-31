import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes =  [
  { path: '/', name: 'home', component: page('~/pages/home') },

  { path: '/login', name: 'login', component: page('~/pages/auth/login') },
  { path: '/register', name: 'register', component: page('~/pages/auth/register') },
  { path: '/email/send', name: 'email.resend', component: page('~/pages/auth/email/send') },
  { path: '/email/verify/:id', name: 'email.verify', component: page('~/pages/auth/email/verify') },
  { path: '/password/reset', name: 'password.request', component: page('~/pages/auth/password/email') },
  { path: '/password/reset/:token', name: 'password.reset', component: page('~/pages/auth/password/reset') },

  { path: '/settings',
    component: page('~/pages/settings/index'),
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: page('~/pages/settings/profile') },
      { path: 'password', name: 'settings.password', component: page('~/pages/settings/password') }
    ] },

  { path: '/admin', name: 'admin.dashboard', component: page('~/pages/admin/index') },
  { path: '/admin/users', name: 'admin.users', component: page('~/pages/admin/users') },
  { path: '/admin/permissions', name: 'admin.permissions', component: page('~/pages/admin/permissions') },
  { path: '/admin/menu', name: 'admin.menu', component: page('~/pages/admin/menus') },
  { path: '/admin/menu/:slug', name: 'admin.menu.slug', component: page('~/pages/admin/menus') },
  { path: '/admin/taxonomy', name: 'admin.taxonomy', component: page('~/pages/admin/taxonomy') },
  { path: '/admin/content', name: 'admin.content', component: page('~/pages/admin/content') },
  { path: '/admin/content/:type', name: 'admin.content.type', component: page('~/pages/admin/content') },
  { path: '/admin/content/:type/create', name: 'admin.content.create', component: page('~/pages/admin/content') },
  { path: '/admin/content/:type/update/:id', name: 'admin.content.update', component: page('~/pages/admin/content') },

  //Presentation pages
  { path: '/presentation/general-education-training', name: 'presentation.general-education-training', component: page('~/pages/presentation/general-education-training') },
  { path: '/presentation/web-programming-materials', name: 'presentation.web-programming-materials', component: page('~/pages/presentation/web-programming-materials') },
  { path: '/presentation/web-programming-materials', name: 'presentation.jquery', component: page('~/pages/presentation/web-programming-materials') },

  { path: '/content/js-plugin/:slug', name: 'content.js-plugin', component: page('~/pages/content/js-plugin') },
  { path: '/content/:type_slug/:slug', name: 'content', component: page('~/pages/errors/404') },

  { path: '*', component: page('~/pages/errors/404') }
]


export function createRouter () {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history'
  })
}