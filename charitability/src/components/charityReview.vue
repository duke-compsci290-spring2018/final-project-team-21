<template>
    <div id="charityReview">
        <div class="container">
            <div class="row">
                <div id="singleReview" class="col-sm-4" v-for="charReview in reviewedCharities">
                    <h3>{{charReview.charityName}}</h3>
                    <hr>
                    <div v-for="review in charReview.charityReview">
                        <p><b>{{currentUser}}: </b>{{review}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    export default {
        name: 'charityReview',
        data () {
            return {
            }
        },
        computed:{
            reviewedCharities(){
                return this.$store.state.reviewedCharities;
            },
            currentUser(){
                return this.$store.state.currentUser;
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
</style>