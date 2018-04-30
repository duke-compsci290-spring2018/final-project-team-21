<template>
    <div id="goals">
        <!-----user goal and progress tracker-->
        <h1 id="title"><b>Goals</b></h1>
        <br>
        <h3>Your Goal: <b v-if="goal!=0">${{goal}}</b><b class="goalMessage" v-if="goal===0">Set a Goal in Profile</b></h3>
<!--        determining how much you raised so far-->
        <h3>Raised so far: <b>${{donationTotal}}</b></h3>
        <h2 v-if="percentTowardsGoal<100">You are <b class="goalMessage">{{percentTowardsGoal}}%</b> to completing your goal</h2>
        <h2 v-if="percentTowardsGoal>=100"><b class="goalMessage">Congratulations!</b> You have completed your goal! Set a new goal in the profile page</h2>
        <br>
        <br>
        <!-----list of donations made by user-->
        <h1><b>Charities You Donated To</b></h1>
        <p v-if="!this.donations" class="NoneMessage">You have not donated to any Charities! Get started in the Charities Tab</p>
        <div class="container">
            <div class="row">
<!--                creation of single donated entry-->
                <div id="singleDonated" class="col-sm-4" v-for="donated in donatedCharities">
                    <h3>{{donated.charityName}}</h3>
                    <h5>Amount Donated: <b>${{donated.donatedAmount}}</b></h5>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
             <!-----list of charities favorited by user-->
        <h1><b>Favorite Charities</b></h1>
        <p v-if="!this.favorites" class="NoneMessage">You do not have any favorite Charities</p>
        <div class="container">
            <div class="row">
<!--                creating a single favorite entry-->
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
        name: "goals",
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
            //display favorited charities from user's favorites array in firebase database
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
            //display donations from user's donations array in firebase database
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
            //returns the user's goal from firebase database
            goal(){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email==this.$store.state.currentUser){
                            var user = this.data[i];
                            return user.goalAmount
                    }
                }
            },
            //returns the user's donation total from firebase database
            donationTotal(){
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email==this.$store.state.currentUser){
                            var user = this.data[i];
                            return user.donationTotal
                    }
                }
            },
            //returns the percentage the user has donated in relation to goal
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
            //remove a charity from user's list of favorites
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
/* styling for title */
    #title{
        margin-top:10px;
    }
/* styling for a favorites panel */
    #singleFavorite{
        border: 1px solid black;
        margin-top:10px;
        border-radius: 10px;
        padding-top:10px;
        padding-bottom:10px;
        background-color:lightyellow;
        margin-bottom:50px;
    }
/* styling for donation button */
    #singleDonated{
        border: 1px solid black;
        margin-top:10px;
        border-radius: 10px;
        padding-top:10px;
        padding-bottom:10px;
        background-color:azure;
    }
/* styling for message if no favorites and donations exists */
    .NoneMessage{
        color:red;
    }
/* styling for goal message */
    .goalMessage{
        color:blue;
    }
</style>