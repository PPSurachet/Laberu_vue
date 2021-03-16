const routes = [{
    path: '/',
    component: () =>
        import('layouts/MainLayout.vue')
},
{
    path: '/index',
    component: () =>
        import('pages/Index.vue')
},
{
    path: '/history',
    component: () =>
        import('pages/History.vue')
},
{
    path: '/register',
    component: () =>
        import('pages/Register.vue')
}, {
    path: '/profile',
    component: () =>
        import('pages/Profile.vue')
},
{
    path: '/tutorial',
    component: () =>
        import('pages/Tutorial.vue')
},
{
    path: '*',
    component: () =>
        import('pages/Error404.vue')
},
]

export default routes