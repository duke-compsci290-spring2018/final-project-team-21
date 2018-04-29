<template>
<div id="Header">
    <h1>Charitability</h1>
    <div id="navbar">
        <div id="leftnav">
            <router-link to='/home'><a id="home">Home</a></router-link>
            <router-link to='/charity' v-if="currentUser"><a id="charities">Charities</a></router-link>
            <router-link to='/admin'><a id="admin" v-if="isAdmin">Admin</a></router-link>
            <router-link to='/progress'><a id="progress" v-if="currentUser && !isAdmin">Progress</a></router-link>
        </div>
        <div id="rightnav">
            <router-link to='/profile'><a id="profile" v-if="currentUser && !isAdmin"><i class="fa fa-user"></i> {{this.currentUser}}</a></router-link>
            <span id="adminprof" v-if="isAdmin"><i class="fa fa-user"></i> {{this.currentUser}}</span>
            <router-link to="/login"><a id="login" v-if="!currentUser"><i class="fa fa-sign-in"></i> Login </a></router-link>
            <a id="logout" @click="logout" v-if="currentUser"><i class="fa fa-sign-out"></i> Logout</a>
        </div>
    </div>
</div>
</template>

<script>
    import firebase from 'firebase';
    
    export default {
        name: "Header",
        computed:{
           currentUser(){
               return this.$store.state.currentUser;
           },
            isAdmin(){
                return this.$store.state.isAdmin;
            }
        },
        data () {
            return {
            }
          },
        methods:{
            logout(){
                firebase.auth().signOut().then(()=>{
                
                    this.$router.replace('home')
                })
                this.$store.state.currentUser = null;
                this.$store.state.isAdmin = false;
            }
        }   
    }
</script>

<style scoped>
    h1{
        font-size: 50px;
        margin-bottom: 20px;
    }
    #home{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #home:hover{
        background-color: #f9f9eb;
        cursor: pointer;
    }
    #profile{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #adminprof{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:15px;
        padding-right:15px;
    }
    #profile:hover{
        background-color: #f9f9eb;
        cursor: pointer;
    }
    #charities{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #charities:hover{
        background-color: #f9f9eb;
        cursor: pointer;
    }
    #progress{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #progress:hover{
        background-color: #f9f9eb;
        cursor: pointer;
    }
    #login{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #login:hover{
        background-color: #f9f9eb;
        cursor: pointer;
    }
    #logout{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #logout:hover{
        background-color: #f9f9eb;
        cursor: pointer;
    }
    #navbar {
        background-color:skyblue;
        overflow: hidden;
        padding-top:5px;
        padding-bottom:5px;
    }
    #leftnav{
        margin-left:20px;
        padding-top:5px;
        padding-bottom:5px;
        display: inline-block;
        float: left;
    }
    #rightnav{
        margin-right:20px;
        padding-top:5px;
        padding-bottom:5px;
        display: inline-block;
        float:right;
    }
</style>