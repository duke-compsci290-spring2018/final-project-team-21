<template>
<div id="Header">
    <h1>Charitability</h1>
    <div id="navbar">
        <div id="leftnav">
            <router-link class="routerLink" to='/home'><a id="home">Home</a></router-link>
            <router-link class="routerLink" to='/charity' v-if="currentUser"><a id="charities">Charities</a></router-link>
            <router-link class="routerLink" to='/charityReview' v-if="currentUser"><a id="charityReview">Reviews</a></router-link>
            <router-link class="routerLink" to='/admin'><a id="admin" v-if="isAdmin">Admin</a></router-link>
            <router-link class="routerLink" to='/goals'><a id="progress" v-if="currentUser && !isAdmin">Goals</a></router-link>
        </div>
        <div id="rightnav">
            <router-link class="routerLink" to='/profile'><a id="profile" v-if="currentUser && !isAdmin"><i class="fa fa-user"></i> {{this.currentUser}}</a></router-link>
            <span id="adminprof" v-if="isAdmin"><i class="fa fa-user"></i> {{this.currentUser}}</span>
            <router-link class="routerLink" to="/login"><a id="login" v-if="!currentUser"><i class="fa fa-sign-in"></i> Login </a></router-link>
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
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #home:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    #profile{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #adminprof{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
    }
    #profile:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    #charities{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #charities:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    #charityReview{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #charityReview:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    #progress{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #progress:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    #login{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #login:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    #logout{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #logout:hover{
        background-color: #d3edf8;
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
    #admin{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #admin:hover{
        background-color: #d3edf8;
        cursor: pointer;
    }
    .routerLink{
        color:black;
        text-decoration: none;
    }
</style>