<template>
        <div class="login">
            <h2>Log In</h2>
            <input class="inputForm" type="text" v-model="email" placeholder="Email"><br>
            <input class="inputForm" type="password" v-model="password" placeholder="Password"><br>
            <button class="btn btn-primary" @click="logIn">Log In</button><br>
            <br>
            <span>Don't have an account? <router-link to="/signup"><button id="signUpButton" class="btn btn-success btn-sm">Sign Up</button></router-link></span>
        </div>
</template>

<script>
import firebase from 'firebase';
import { dataRef } from '../database.js';

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    firebase:{
        data: dataRef
    },
    methods: {
        logIn(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user)=>{
                    this.$router.replace('home');
                    this.$store.state.currentUser = this.email;
                    for(var i=0;i<this.data.length;i++){
                        if(this.data[i].email==this.email){
                            this.$store.state.userImgUrl = this.data[i].userImgUrl;
                        }
                    }
                    user.updateProfile({
                        photoURL: this.$store.state.userImgUrl
                        })
                    if (this.email=='admin@admin.com'){
                        this.$store.state.isAdmin = true;
                    }
                },
                (err)=>{
                    alert('Failed to sign in. '+err.message);
                })
        }
    }
}

</script>

<style scoped>
    .login {
        margin-top: 40px;
        border-top: 3px solid black;
        border-bottom: 3px solid black;
        padding-top:20px;
        padding-bottom:20px;
    }
    input {
        margin: 5px 0px;
    }
    button {
        margin-top: 20px;
        width: 15%;
        cursor: pointer;
    }
    #signUpButton{
        width:100px;
        height:40px;
        margin-left:10px;
        margin-bottom:15px;
    }
    .inputForm{
        border: 1px solid grey;
        border-radius: 5px;
        padding: 5px 5px 5px 5px
    }
</style>