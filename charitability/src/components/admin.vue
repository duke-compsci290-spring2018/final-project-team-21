<template>
    <div id="admin">
        <br>
<!--        creating the users-->
        <h2><b>Users</b></h2>
        <br>
        <div class="container">
            <div class="row">
                <!--a list of all of the users-->
                <div id="singleUser" class="col-sm-4" v-for="user in data">
                    <h5><b>Email: {{user.email}}</b></h5>
                    <h5>Password: {{user.password}}</h5>
                </div>
            </div>
        </div>
        <br>
        <!--a history of donations-->
        <h2><b>Donations Log</b></h2>
        <br>
<!--        showing the donations-->
        <div v-for="donation in donations">
            <p><b>{{donation.user}}</b> donated <b>${{donation.donatedAmount}}</b> to {{ donation.charityName }}.</p>
            <hr>
        </div>
    </div>
</template>

<script>
    
    import { donationsRef, dataRef, storageRef } from "../database.js";

    export default {
        name: "admin",
        data () {
            return {
            }
        },
        firebase:{
            //putting on firebase
            data: dataRef,
            donations: donationsRef
        }
    }
</script>

<style scoped>
/*    styling for a single user entry*/
    #singleUser{
        border: 1px solid black;
        margin-top:10px;
        border-radius: 10px;
        padding-top:10px;
        padding-bottom:10px;
    }
    
</style>