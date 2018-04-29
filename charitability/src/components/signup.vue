<template>
        <div class="signup">
            <h3>Sign Up</h3>
            <input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <button @click="signUp">Sign Up</button><br>
            <span>Have an account? <router-link to="/login">Login</router-link></span>
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
    }
    input {
        margin: 5px 0px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
</style>