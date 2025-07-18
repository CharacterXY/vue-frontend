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

router.beforeEach((to, from, next) => {
    // moraju se vracati closure next inace ce puknit u produkciji
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if(to.meta.requiresAdmin && (!loggedUser || loggedUser.role !== "admin")) {
        return next('/dashboard');
    }
    return next();

   
})




export default router