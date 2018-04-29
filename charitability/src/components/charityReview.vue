<template>
    <div id="charityReview">
        <div class="container">
            <div class="row">
                <div id="singleReview" class="col-sm-4" v-for="charity in reviewedCharities">
                    <h3>{{charity.charityName}}</h3>
                    <hr>
                    <div v-for="charReview in charity.charityReviews">
                        <p><b>{{charReview.user}}: </b>{{charReview.review}}</p>
                    </div>
                    <button id="deleteButton" @click="deleteReview(charity)" v-if="isAdmin" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    import firebase from 'firebase'
    import { reviewsRef, dataRef } from '../database.js';
    export default {
        name: 'charityReview',
        data () {
            return {
            }
        },
        firebase: {
            reviews: reviewsRef,
            data: dataRef
        },
        computed:{
            reviewedCharities(){
                return this.reviews;
            },
            isAdmin(){
                return this.$store.state.isAdmin;
            }
        },
        methods:{
            deleteReview(charity){
                reviewsRef.child(charity['.key']).remove();
            }
        }
    }
</script>

<style>
    #singleReview{
        border: 1px solid black;
        margin-top:30px;
        border-radius: 10px;
        padding-top:10px;
        background-color:cornsilk;
    }
    #deleteButton{
        margin-bottom:10px;
    }
</style>