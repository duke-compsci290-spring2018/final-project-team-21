import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import {store} from './store.js'
import VueFire from 'vuefire'
import firebase from 'firebase'

//import styling
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//import components
import login from './components/login.vue'
import signup from './components/signup.vue'
import profile from './components/profile.vue'
import home from './components/home.vue'
import charity from './components/charity.vue'
import progress from './components/progress.vue'
import admin from './components/admin.vue'
import charityReview from './components/charityReview.vue'


Vue.use(VueRouter)
Vue.use(BootstrapVue)
// connect Firebase to Vue
Vue.use(VueFire);

// turn off the console note about switching to production mode
Vue.config.productionTip = false


const routes = [
    { path:'/charitability/', component:home, props: true},
    { path:'/login', component:login, props: true},
    { path:'/signup', component:signup, props:true },
    { path:'/profile', component:profile},
    { path:'/charity', component:charity },
    { path:'/home', component:home },
    { path:'/goals', component:progress},
    { path: '/admin', component:admin},
    { path: '/charityReview', component:charityReview}
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