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
                <p><b>Change Username:</b></p>
                <input type="text">
                <input type="submit">
                <br>
                <br>
                <p><b>Change Password:</b></p>
                <input type="text">
                <input type="submit">
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
    import { dataRef, storageRef } from "../database.js";
    export default {
        name: "profile",
        firebase:{
            data: dataRef
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
                this.$store.state.userImgUrl = url;
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].name===this.currentUser){
                        var user = this.data[i];
                        dataRef.child(user['.key']).update({userImgUrl: this.userImage});
                    }
                }
                console.log(this.userImage);

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