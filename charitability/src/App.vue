<template>
  <div id="app">
      <Header></Header>
  </div>
</template>

<script>
    import Header from "./Header.vue";
export default {
  name: 'app',
    
  data () {
    return {
      
    }
  },
    
    components:{
        Header
    }

}
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      text-align: center;
      color: #2c3e50;
    }
</style>
