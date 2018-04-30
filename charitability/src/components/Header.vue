<template>
<div id="Header">
    <h1>Charitability</h1>
    <!-- navigation bar-->
    <div id="navbar">
        <div id="leftnav">
<!--            navigation to specific links based on roles-->
            <router-link class="routerLink" to='/home'><a id="home">Home</a></router-link>
            <router-link class="routerLink" to='/charity' v-if="currentUser"><span id="charities" v-if="currentUser">Charities</span></router-link>
            <router-link class="routerLink" to='/charityReview' v-if="currentUser"><span id="charityReview" v-if="currentUser">Reviews</span></router-link>
            <router-link class="routerLink" to='/admin' v-if="isAdmin"><span id="admin" v-if="isAdmin">Admin</span></router-link>
            <router-link class="routerLink" to='/goals' v-if="currentUser && !isAdmin"><span id="goals" v-if="currentUser && !isAdmin">Goals</span></router-link>
        </div>
        <div id="rightnav">
<!--            logging in and profile page-->
            <router-link class="routerLink" to='/profile' v-if="currentUser && !isAdmin"><span id="profile" v-if="currentUser && !isAdmin"><i class="fa fa-user"></i> {{this.currentUser}}</span></router-link>
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
            //returns email of current user
           currentUser(){
               return this.$store.state.currentUser;
           },
            //returns true if the current user is an admin
            isAdmin(){
                return this.$store.state.isAdmin;
            }
        },
        data () {
            return {
            }
          },
        methods:{
            //log user out
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
    /*styling for each link in header nav */
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
    #goals{
        padding-top:12px;
        padding-bottom:12px;
        padding-left:15px;
        padding-right:15px;
        cursor: pointer;
    }
    #goals:hover{
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
/*    styling for left nav */
    #leftnav{
        margin-left:20px;
        padding-top:5px;
        padding-bottom:5px;
        display: inline-block;
        float: left;
    }
/*    styling for right nav*/
    #rightnav{
        margin-right:20px;
        padding-top:5px;
        padding-bottom:5px;
        display: inline-block;
        float:right;
    }
/*    styling for admin nav*/
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
/* styling for router*/
    .routerLink{
        color:black;
        text-decoration: none;
    }
</style>