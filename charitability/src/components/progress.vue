<template>
    <div id="progress">
        <h1 id="title"><b>Goals</b></h1>
        <br>
        <h3>Your Goal: <b v-if="goal!=0">${{goal}}</b><b class="goalMessage" v-if="goal===0">Set a Goal in Profile</b></h3>
        <h3>Raised so far: <b>${{donationTotal}}</b></h3>
        <h2 v-if="percentTowardsGoal<100">You are <b class="goalMessage">{{percentTowardsGoal}}%</b> to completing your goal</h2>
        <h2 v-if="percentTowardsGoal>=100"><b class="goalMessage">Congratulations!</b> You have completed your goal! Set a new goal in the profile page</h2>
        <br>
        <br>
        <h1><b>Charities You Donated To</b></h1>
        <p v-if="!this.donations" class="NoneMessage">You have not donated to any Charities! Get started in the Charities Tab</p>
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
        <h1><b>Favorite Charities</b></h1>
        <p v-if="!this.favorites" class="NoneMessage">You do not have any favorite Charities</p>
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
import firebase from 'firebase';
import { dataRef, donationsRef } from '../database.js';
    export default {
        name: "progress",
        data () {
            return {
                none: [],
                favorites: true,
                donations: true
            }
        },
        firebase: {
            donations: donationsRef,
            data: dataRef
        },
        computed:{
            favoriteList(){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email==this.$store.state.currentUser){
                            var user = this.data[i];
                                if (user.favorites==false){
                                    this.favorites = false;
                                    return this.none
                                }
                                else{
                                    return user.favorites
                                }
                            }
                        }
                return this.none
            },
            donatedCharities(){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email==this.$store.state.currentUser){
                            var user = this.data[i];
                                if (user.donations==false){
                                    this.donations = false;
                                    return this.none
                                }
                                else{
                                    return user.donations
                                }
                            }
                        }
                return this.none
            },
            goal(){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email==this.$store.state.currentUser){
                            var user = this.data[i];
                            return user.goalAmount
                    }
                }
            },
            donationTotal(){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email==this.$store.state.currentUser){
                            var user = this.data[i];
                            return user.donationTotal
                    }
                }
            },
            percentTowardsGoal(){
                if(this.donationTotal==0){
                    return 0;
                }
                else{
                    return Math.floor((this.donationTotal/this.goal)*100);
                }
            }
        },
        methods:{
            removeCharity(index){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email==this.$store.state.currentUser){
                       var user = this.data[i];
                        dataRef.child(user['.key']).child('favorites').child(index).remove();
                    }
                }
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
    .NoneMessage{
        color:red;
    }
    .goalMessage{
        color:blue;
    }
</style>