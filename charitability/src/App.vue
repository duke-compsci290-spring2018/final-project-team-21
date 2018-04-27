<template>
  <div id="app">
      <Header></Header>
      <router-view></router-view>
  </div>
</template>

<script>
    
    import Header from "./components/Header.vue";
    import profile from "./components/profile.vue";
    import home from "./components/home.vue";
    import login from "./components/login.vue";
    import {dataRef} from "./database.js";
    
    
export default {
  name: 'app',
    
  computed:{
    currentUser(){
         return this.$store.state.currentUser;
    },
    loggedIn(){
        return this.$store.state.UserloggedIn;
    }
  },
    
  firebase: {
      data: dataRef
  },
    
  data () {
    return {
    }
  },
    
    components:{
        Header,
        profile,
        home,
        login
    }

}
</script>

<style scoped>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      text-align: center;
      color: #2c3e50;
      margin-top:30px;
    }
</style>
