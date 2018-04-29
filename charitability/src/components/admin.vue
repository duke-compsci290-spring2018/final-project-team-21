<template>
    <div id="admin">
        <br>
        <h2><b>Users</b></h2>
        <br>
        <div class="container">
            <div class="row">
                <div id="singleUser" class="col-sm-4" v-for="user in data">
                    <h5><b>Email: {{user.email}}</b></h5>
                    <h5>Password: {{user.password}}</h5>
                </div>
            </div>
        </div>
        <br>
        <h2><b>Donations Log</b></h2>
        <br>
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
            data: dataRef,
            donations: donationsRef
        }
    }
</script>

<style scoped>
    #singleUser{
        border: 1px solid black;
        margin-top:10px;
        border-radius: 10px;
        padding-top:10px;
        padding-bottom:10px;
    }
    
</style>