<template>
<div id="Header">
    <h1>Charitability</h1>
    <div id="navbar">
        <div id="leftnav">
            <router-link to='/home'><a id="home">Home</a></router-link>
            <a id="charities">Charities</a>
            <a id="progress">Progress</a>
        </div>
        <div id="rightnav">
            <router-link to='/profile'><a id="profile"><i class="fa fa-user"></i> Profile</a></router-link>
            <router-link to='/login'><a id="login"><i class="fa fa-sign-in"></i> Login</a></router-link>
            <a id="logout" @click="logout"><i class="fa fa-sign-out"></i> Logout</a>
        </div>
    </div>
</div>
</template>

<script>
    import firebase from 'firebase';
    
    export default {
        name: "Header",
        
        data () {
            return {
            }
          },
        methods:{
            logout(){
                firebase.auth().signOut().then(()=>{this.$router.replace('home')
                })
            }
        },
        props:[
            "loggedIn"
        ]
            
    }
</script>

<style scoped>
    h1{
        font-size: 50px;
        margin-bottom: 30px;
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
        background-color:#eeeec3;
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