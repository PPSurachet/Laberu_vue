const routes = [
    {
        path: '/', component: () => import('pages/admin.vue'),
    },
    {
        path: '/index', component: () => import('pages/Index.vue')
    },
    {
        path: '/profile', component: () => import('pages/Profile.vue')
    },
    {
        path: '/register', component: () => import('pages/Register.vue')
    },
    {
        path: '/tutorial', component: () => import('pages/Tutorial.vue')
    },
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
