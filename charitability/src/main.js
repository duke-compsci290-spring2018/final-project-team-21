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
import goals from './components/goals.vue'
import admin from './components/admin.vue'
import charityReview from './components/charityReview.vue'


Vue.use(VueRouter)
Vue.use(BootstrapVue)
// connect Firebase to Vue
Vue.use(VueFire);

// turn off the console note about switching to production mode
Vue.config.productionTip = false

//routes and url path
const routes = [
    { path:'/', component:home, props: true},
    { path:'/login', component:login, props: true},
    { path:'/signup', component:signup, props:true },
    { path:'/profile', component:profile},
    { path:'/charity', component:charity },
    { path:'/home', component:home },
    { path:'/goals', component:goals},
    { path: '/admin', component:admin},
    { path: '/charityReview', component:charityReview}
]

//creation of router
const router = new VueRouter({
    routes,
    mode: 'history'
})

//creating vue
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})