import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import UserDashboard from '../views/UserDashboard.vue'
import SignUpPage from '../views/SignUpPage.vue'
import AdminPage from '../views/AdminPage.vue'



const routes = [
    { path: '/', component: LoginPage },
    { path: '/dashboard', component: UserDashboard },
    { path: '/signup', component: SignUpPage },
    { path: '/admin', name: 'Admin', component: AdminPage, meta: { requiresAdmin: true }},
  
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router