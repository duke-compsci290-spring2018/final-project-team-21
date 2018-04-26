<template>
  <div id="app">
      <Header :loggedIn="loggedIn"></Header>
      <profile></profile>
      <router-view></router-view>
  </div>
</template>

<script>
    import Header from "./components/Header.vue";
    import profile from "./components/profile.vue";
    import home from "./components/home.vue";
    import axios from "axios";
    
export default {
  name: 'app',
    
  data () {
    return {
        loggedIn: false
    }
  },
    
    components:{
        Header,
        profile,
        home
    }

}
</script>

<style scoped>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      text-align: center;
      color: #2c3e50;
      margin-top:50px;
    }
</style>
