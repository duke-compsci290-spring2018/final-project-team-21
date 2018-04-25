import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'


//import styling
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//import components
import login from './components/login.vue'
import signup from './components/signup.vue'
import profile from './components/profile.vue'
import home from './components/home.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCer-ja4FYfPjI2xtauwcedyZ5GucqzDoc",
    authDomain: "charitability-94e58.firebaseapp.com",
    databaseURL: "https://charitability-94e58.firebaseio.com",
    projectId: "charitability-94e58",
    storageBucket: "charitability-94e58.appspot.com",
    messagingSenderId: "319350461000"
};
firebase.initializeApp(config);

// turn off the console note about switching to production mode
Vue.config.productionTip = false


const routes = [
    { path:'/login', component:login },
    { path:'/signup', component:signup },
    { path:'/profile', component:profile },
    { path:'/home', component:home }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})