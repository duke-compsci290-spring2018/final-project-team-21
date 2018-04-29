<template>
    <div id="progress">
        <h1 id="title">Goals</h1>
        <br>
        <br>
        <h2>Charities You donated To</h2>
        <div class="container">
            <div class="row">
                <div id="singleDonated" class="col-sm-4" v-for="donated in donatedCharities">
                    <h3>{{donated.charityName}}</h3>
                    <h5>Amount Donated: <b>${{donated.donatedAmount}}</b></h5>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <h2>Favorite Charities</h2>
        <div class="container">
            <div class="row">
                <div id="singleFavorite" class="col-sm-4" v-for="(char,index) in favoriteList">
                    <h3>{{char.charityName}}</h3>
                    <h5>{{char.charityTagLine}}</h5>
                    <img :src="char.charityRatingImage" alt="Charity Rating Image">
                    <br>
                    <br>
                    <button class="btn btn-danger" @click="removeCharity(index)">Remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "progress",
        data () {
        return {
            }
        },
        computed:{
            favoriteList(){
                return this.$store.state.favoriteList;
            },
            donatedCharities(){
                return this.$store.state.donatedCharities;
            }
        },
        methods:{
            removeCharity(index){
                this.$store.state.favoriteList.splice(index,1);
            }
        }
    }
</script>

<style scoped>
    #title{
        margin-top:10px;
    }
    #singleFavorite{
        border: 1px solid black;
        margin-top:10px;
        border-radius: 10px;
        padding-top:10px;
        padding-bottom:10px;
        background-color:lightyellow;
        margin-bottom:50px;
    }
    #singleDonated{
        border: 1px solid black;
        margin-top:10px;
        border-radius: 10px;
        padding-top:10px;
        padding-bottom:10px;
        background-color:azure;
    }
</style>