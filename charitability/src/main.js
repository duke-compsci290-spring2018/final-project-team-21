import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import {store} from './store.js'
import VueFire from 'vuefire'


//import styling
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//import components
import login from './components/login.vue'
import signup from './components/signup.vue'
import profile from './components/profile.vue'
import home from './components/home.vue'
import charity from './components/charity.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
// connect Firebase to Vue
Vue.use(VueFire);

// turn off the console note about switching to production mode
Vue.config.productionTip = false


const routes = [
    { path:'/login', component:login, props: true},
    { path:'/signup', component:signup, props:true },
    { path:'/profile', component:profile },
    { path:'/home', component:home },
    { path:'/charity/:charName', component:charity }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})