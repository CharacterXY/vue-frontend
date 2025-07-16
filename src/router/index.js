import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import UserDashboard from '../views/UserDashboard.vue'

const routes = [
    { path: '/', component: LoginPage },
    { path: '/dashboard', component: UserDashboard },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router