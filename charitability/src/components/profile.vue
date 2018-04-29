<template>
    <div id="profile">
        <div id="profileInfo">
            <img :style="{'max-width': '184px'}" :src="userImage" alt="userPicture">
            <br>
            <br>
            <div id="changeInfo">
                <p><b>Change Profile Picture:</b></p>
                <form id="form" @submit.prevent="storeUserImage">
                            <input type="file" id="userPictureInput">
                            <input type="submit" value="Add Image" />
                        </form>
                <br>
                <p><b>Change Email:</b></p>
                <input v-model="email" type="text">
                <input @click.prevent="updateEmail" type="submit">
                <br>
                <p><b>Change Password:</b></p>
                <input v-model="password" type="text">
                <input @click.prevent="updatePassword" type="submit">
            </div>
            </div>
            <div id="vl">
            <div id="right">
                <h5>Favorited Charities</h5>
                <br>
                <br>
                <br>
                <br>
                <h5>Charities Recently Donated to</h5>
                <br>
                <br>
                <br>
                <br>
                <h5>Recommended Charities</h5>
                <br>
                <br>
                <br>
                <br>
                <h5>Your Jar of Hearts</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import { dataRef, storageRef } from "../database.js";
    export default {
        name: "profile",
        firebase:{
            data: dataRef
        },
        data() {
            return {
                email: '',
                password: ''
            }
        },
        computed:{
           currentUser(){
               return this.$store.state.currentUser;
           },
            userImage(){
                return this.$store.state.userImgUrl;
            }
        },
        methods:{
            // get image selected by user and upload it to Firebase for storage
            storeUserImage:  function(event) {
                // get input element user used to select local image
                var input = document.getElementById('userPictureInput');
                // have all fields in the form been completed
                if (input.files.length > 0) {
                    var file = input.files[0];
                    // get reference to a storage location and
                    storageRef.child('images/' + file.name)
                              .put(file)
                              .then(snapshot => this.addUserImage(snapshot.downloadURL));
                    // reset input values so user knows to input new data
                    input.value = '';
                }
            },
            //adding the user image
            addUserImage:  function(url) {
                var user = firebase.auth().currentUser;
                user.updateProfile({
                        photoURL: url
                        })
                this.$store.state.userImgUrl = url;
                
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email===this.currentUser){
                        var user = this.data[i];
                        dataRef.child(user['.key']).update({userImgUrl: this.userImage});
                    }
                }
                console.log(this.userImage);
            },
            updateEmail(){
                    var user = firebase.auth().currentUser;
                    var password = ''
                    var email = ''
                    for(var i=0;i<this.data.length;i++){
                        if(this.data[i].email===this.currentUser){
                            password=this.data[i].password
                            email=this.data[i].email
                        }
                    }
                    var credential = firebase.auth.EmailAuthProvider.credential(email, password)
                    user.reauthenticateWithCredential(credential);
                
                    user.updateEmail(this.email).then((data) => {
                        console.log("email updated")
                        this.changeEmailInDatabase()
                    }).catch(function(error) {
                        alert("Unable to change email. " + error.message)
                    });
            },
            changeEmailInDatabase(){
                    for(var i=0;i<this.data.length;i++){
                                    if(this.data[i].email===this.currentUser){
                                    var currentUser = this.data[i];
                                    dataRef.child(currentUser['.key']).update({email: this.email});
                                    this.$store.state.currentUser=this.email;
                                }   
                            }
                    alert('Email changed to '+ this.email)
                    this.email=""
                },
            updatePassword(){
                    var user = firebase.auth().currentUser;
                    var password = ''
                    var email = ''
                    for(var i=0;i<this.data.length;i++){
                        if(this.data[i].email===this.currentUser){
                            password=this.data[i].password
                            email=this.data[i].email
                        }
                    }
                    var credential = firebase.auth.EmailAuthProvider.credential(email, password)
                    user.reauthenticateWithCredential(credential);
                    user.updatePassword(this.password).then((data) => {
                        console.log("password updated")
                        this.changePasswordInDatabase()
                    }).catch(function(error) {
                        alert("Unable to change password. " + error.message)
                    });
            },
            changePasswordInDatabase() {
                for(var i=0;i<this.data.length;i++){
                            if(this.data[i].email===this.currentUser){
                            var user = this.data[i];
                            dataRef.child(user['.key']).update({password: this.password});
                        }
                        }
                    alert('Password changed!')
                    this.password=""
            } 
        }
    }
</script>

<style scoped>
    #changeInfo{
        text-align: left;
    }
    #profileInfo{
        display:inline;
        float:left;
        margin-left: 55px;
        margin-top: 10px;
    }
    #right{
        text-align:left;
        margin-left:40px;
    }
    #vl {
        margin-top:20px;
        margin-left:500px;
        border-left: 1px solid grey;
        height: 510px;
}
</style>