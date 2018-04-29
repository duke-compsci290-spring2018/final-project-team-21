<template>
    <div id="home">
        <div id="featured">
            <h3>Featured Charities</h3>
<!--
            <div v-for="char in charData">
                {{char.charityName}}
            </div>
-->
        </div>
        <div id=highestRated>
            <h3>Highest Rated Charities</h3>
            <div v-for="char in charDataHighestRated">
                {{char.charityName}}
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
    export default {
        name: "home",
        data () {
            return {
                charDataHighestRated: []
            }
        },
        mounted () {
            axios.get('https://api.data.charitynavigator.org/v2/Organizations?app_id=d1095a51&app_key=61c19ae8a70b9bfdf6f1fe21d0f4b244&rated=true&minRating=4&maxRating=4').then(response => (this.charDataHighestRated = response.data)).catch(error => console.log(error))
        }
    }
</script>

<style scoped>
    #featured{
        margin-top:20px;
    }
</style>