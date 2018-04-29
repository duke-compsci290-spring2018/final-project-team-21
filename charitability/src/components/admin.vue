<template>
    <div id="admin">
        <h2>Users</h2>
        <div v-for="user in data">
            <p>{{user.email}}</p>
        </div>
    </div>
</template>

<script>
    
    import { dataRef, storageRef } from "../database.js";

    export default {
        name: "admin",
        data () {
            return {
            }
        },
        firebase:{
            data: dataRef
        },
        created(){
            
        }
    }
</script>

<style scoped>
    
</style>