<template>
    <div id="profile">
        <div id="container">
        <div id="profileInfo">
            <img id="image" :style="{'max-width': '184px'}" :src="userImage" alt="userPicture">
            <br>
            <br>
            <!--add profile picture-->
            <div id="changeInfo">
                <p><b>Change Profile Picture:</b></p>
                <form id="form" @submit.prevent="storeUserImage">
                            <input type="file" id="userPictureInput">
                            <input type="submit" value="Add Image" />
                        </form>
                <br>
                 <!--change email----------->
                <p><b>Change Email:</b></p>
                <input v-model="email" type="text" placeholder="New Email">
                <input class="submitButton" @click.prevent="updateEmail" type="submit">
                <br>
                <br>
                  <!--change password----------->
                <p><b>Change Password:</b></p>
                <input v-model="password" type="text" placeholder="New Password">
                <input class="submitButton" @click.prevent="updatePassword" type="submit">
                <br>
                <br>
               <!--create or update goal----------->
                <p><b>Update Goal: </b></p>
                <p><i>How much money do you want to raise?</i></p>
                <input v-model="goal"id="goalInput" type="text" placeholder="New Goal">
                <input type="submit" id="submitGoal" class="submitButton" @click="submitGoal">
            </div>
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
                //user information
                email: '',
                password: '',
                goal: ''
            }
        },
        computed:{
            //returns current user
           currentUser(){
               return this.$store.state.currentUser;
           },
            //returns current user's profile picture
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
            //update email address of user
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
                //reauthenticate user
                    var credential = firebase.auth.EmailAuthProvider.credential(email, password)
                    user.reauthenticateWithCredential(credential);
                //change email address in firebase authentication
                    user.updateEmail(this.email).then((data) => {
                        console.log("email updated")
                        this.changeEmailInDatabase()
                    }).catch(function(error) {
                        alert("Unable to change email. " + error.message)
                    });
            },
            //change email address in firebase database
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
            //update user's password
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
                //reauthenticate user
                    var credential = firebase.auth.EmailAuthProvider.credential(email, password)
                    user.reauthenticateWithCredential(credential);
                //updates password in firebase authentication
                    user.updatePassword(this.password).then((data) => {
                        console.log("password updated")
                        this.changePasswordInDatabase()
                    }).catch(function(error) {
                        alert("Unable to change password. " + error.message)
                    });
            },
            //change password in firebase database
            changePasswordInDatabase() {
                for(var i=0;i<this.data.length;i++){
                            if(this.data[i].email===this.currentUser){
                            var user = this.data[i];
                            dataRef.child(user['.key']).update({password: this.password});
                        }
                        }
                    alert('Password changed!')
                    this.password=""
            },
            //allows user to set a donation goal
            submitGoal(){
                console.log(this.goal);
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email===this.currentUser){
                        var user = this.data[i];
                        dataRef.child(user['.key']).update({goalAmount: this.goal })
                    }
                }
                document.getElementById("goalInput").value = "";
            }
        }
    }
</script>

<style scoped>
/*  styling for profile picture  */
    #image{
        margin-right:50px;
        margin-top:20px;
    }
/* styling for profile information   */
    #profileInfo{       
        display:inline;
        margin-left: 55px;
        margin-top: 10px;
    }
/*  styling for profile div */
    #container{
        margin-top:50px;
        border-left: 1px solid black;
        border-right: 1px solid black;
        width:600px;
        margin: 0 auto;
        height: 650px;
    }
/*  styling for submit button*/
    .submitButton{
        height:32px;
        width: 70px;
        background-color:deepskyblue;
        color:white;
        border-radius: 5px;
        border:none;
        cursor:pointer;
    }
</style>