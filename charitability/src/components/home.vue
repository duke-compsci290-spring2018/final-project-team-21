<template>
    <div id="home">
        <div id="featured">
            
            <!--featured charities-->
            <h1><b>Featured Charities</b></h1>
            <div class="container">
                <div class="row">
<!--                    creation of single featured entry-->
                    <div id="singleFeatured" class="col-sm-3" v-for="char in charDataFeatured">
                        <h5><b>{{char.charityName}}</b></h5>
                        <hr>
                        {{char.tagLine}}
                        <br>
                        <br>
                        <b>{{char.category.categoryName}}</b>
                        <br>
                        <img :src="char.currentRating.ratingImage.large" alt="Charity Rating">
                        <hr>
<!--                        add to favorites button-->
                        <button id="favoritesButton" v-if="currentUser" class="btn btn-success" @click="addToFavorites(char.charityName,char.tagLine,char.currentRating.ratingImage.large)">Add to Favorites</button>
                        <br>
                        <br>
                        <p v-if="currentUser">Donate through the Charities Tab</p>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <!--highest rated charities-->
        <div id=highestRated>
            <h1><b>Highest Rated Charities</b></h1>
            <div class="container">
                <div class="row">
<!--                    creation of single highest entry-->
                    <div id="singleHighest" class="col-sm-2" v-for="char in charDataHighestRated">
                        <h5><b>{{char.charityName}}</b></h5>
                        <hr>
                        {{char.tagLine}}
                        <br>
                        <br>
                        <b>{{char.category.categoryName}}</b>
                        <br>
                        <img :src="char.currentRating.ratingImage.large" alt="Charity Rating">
                        <hr>
<!--                        add to favorites button-->
                        <button id="favoritesButton" v-if="currentUser" class="btn btn-success" @click="addToFavorites(char.charityName,char.tagLine,char.currentRating.ratingImage.large)">Add to Favorites</button>
                        <br>
                        <br>
                        <p v-if="currentUser">Donate through the Charities Tab</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { donationsRef,dataRef } from "../database.js";
import firebase from "firebase";
    
    export default {
        name: "home",
        data () {
            return {
                //information from API
                charDataHighestRated: [],
                charDataFeatured: []
            }
        },
        firebase: {
            //firebase references
            donations: donationsRef,
            data: dataRef
        },
        //get data from charity navigator api
        mounted () {
            axios.get('https://api.data.charitynavigator.org/v2/Organizations?app_id=d1095a51&app_key=61c19ae8a70b9bfdf6f1fe21d0f4b244&pageSize=24&pageNum=1&rated=true&minRating=4&maxRating=4').then(response => (this.charDataHighestRated = response.data)).catch(error => console.log(error)),
            
            axios.get('https://api.data.charitynavigator.org/v2/Organizations?app_id=d1095a51&app_key=61c19ae8a70b9bfdf6f1fe21d0f4b244&pageSize=4&pageNum=1&rated=true&minRating=3&maxRating=4&scopeOfWork=INTERNATIONAL').then(response => (this.charDataFeatured = response.data)).catch(error => console.log(error))
        },
        computed:{
            //return the current user
            currentUser(){
               return this.$store.state.currentUser;
            }
        },
        //add a charity to current user's list of favorites
        methods:{
            addToFavorites(name, tagline, image){
                var exists = false;
                if(!exists){
                    for(var i=0;i<this.data.length;i++){
                        if(this.data[i].email===this.$store.state.currentUser){
                            var user = this.data[i];
                            if (dataRef.child(user['.key']).favorites==false){
                                dataRef.child(user['.key']).update({favorites: [
                                {charityName: name, charityTagLine: tagline, charityRatingImage: image}]})
                            }
                            else{
                            dataRef.child(user['.key']).child('favorites').push({
                                charityName: name,
                                charityTagLine: tagline,
                                charityRatingImage: image
                            });
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
/*    styling for featured charities*/
    #featured{
        margin-top:20px;
        margin-bottom:30px;
    }
    #singleFeatured{
        border: 1px solid black;
        margin-top:30px;
        border-radius: 10px;
        padding-top:10px;
        background-color:#ffe6e6;
    }
    #singleHighest{
        border: 1px solid black;
        margin-top:30px;
        border-radius: 10px;
        padding-top:10px;
        background-color:beige;
    }
    /*  styling for favorites button  */
    #favoritesButton{
        margin-bottom:5px;
    }
</style>