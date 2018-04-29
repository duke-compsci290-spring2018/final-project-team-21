<template>
        <div class="signup">
            <h2>Sign Up</h2>
            <input class="inputForm" type="text" v-model="email" placeholder="Email"><br>
            <input class="inputForm" type="password" v-model="password" placeholder="Password"><br>
            <button class="btn btn-success" @click="signUp">Sign Up</button><br>
            <span>Have an account? <router-link to="/login"><button id="loginButton" class="btn btn-primary btn-sm">Login</button></router-link></span>
        </div>
</template>

<script>
import firebase from 'firebase';
import { dataRef, storageRef } from '../database.js';
    
export default {
    name: 'signup',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signUp(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user)=>{
                    this.$router.replace('home');
                    this.$store.state.currentUser = this.email;
                    this.$store.state.userImgUrl = "http://www.styletextile.com/wp-content/uploads/2017/10/profile.jpg"

                    dataRef.push({
                        email: this.email,
                        password: this.password,
                        userImgUrl: "http://www.styletextile.com/wp-content/uploads/2017/10/profile.jpg",
                        donations: false,
                        favorites: false,
                        goalAmount: 0,
                        donationTotal: 0
                    });
                    
                    user.updateProfile({
                        photoURL: 'http://www.styletextile.com/wp-content/uploads/2017/10/profile.jpg'
                        })
                    if (this.email=='admin@admin.com'){
                        this.$store.state.isAdmin = true;
                    }
                    
                },
                (err)=>{
                    alert('Failed to create account. '+err.message)
                })
        }
    }
}

</script>

<style scoped>
    .signup {
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
        width: 10%;
        cursor: pointer;
    }
    .inputForm{
        border: 1px solid grey;
        border-radius: 5px;
        padding: 5px 5px 5px 5px
    }
    #loginButton{
        width:100px;
        height:40px;
        margin-left:10px;
        margin-bottom:15px;
    }
</style>