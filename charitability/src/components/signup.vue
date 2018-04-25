<template>
        <div class="signup">
            <h3>Sign Up</h3>
            <input type="text" v-model="email" placeholder="Email"><br>
            <input type="text" v-model="username" placeholder="Username"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <button @click="signUp">Sign Up</button><br>
            <span>Have an account? <router-link to="/login">Login</router-link></span>
        </div>
</template>

<script>
import firebase from 'firebase';
    
export default {
    name: 'signup',
    data() {
        return {
            email: '',
            username: '',
            password: ''
        }
    },
    methods: {
        signUp(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user)=>{
                    this.$router.replace('home')
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