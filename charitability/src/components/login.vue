<template>
        <div class="login">
            <h3>Log In</h3>
            <input type="text" v-model="email" placeholder="Email"><br>
            <input type="text" v-model="username" placeholder="Username"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <button @click="logIn">Log In</button><br>
            <span>Don't have an account? <router-link to="/signup">Create One</router-link></span>
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
            username: '',
            password: '',
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
                    this.$store.state.currentUser = this.username;
                    this.$store.state.UserloggedIn = true;
                    for(var i=0;i<this.data.length;i++){
                        if(this.data[i].name===this.username){
                            this.$store.state.userImgUrl = this.data[i].userImgUrl;
                        }
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
    }
    input {
        margin: 5px 0px;
    }
    button {
        margin-top: 20px;
        width: 15%;
        cursor: pointer;
    }
</style>