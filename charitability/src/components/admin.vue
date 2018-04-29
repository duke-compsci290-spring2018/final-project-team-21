<template>
    <div id="admin">
        <h2>Users</h2>
        <div v-for="user in data">
            <p>{{user.email}}</p>
        </div>
        <h2>Donations Log</h2>
        <div v-for="donation in donations">
            <p>{{donation.user}} donated {{donation.donatedAmount}} to {{ donation.charityName }}.</p>
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
        },
        created(){
            
        }
    }
</script>

<style scoped>
    
</style>