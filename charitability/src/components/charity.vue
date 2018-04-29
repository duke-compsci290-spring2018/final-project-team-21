<template>
    <div id="charity">
        <div id="searchArea">
            <div id="filter">
                <b>Category:</b>
                <input id="searchBar" type="text" v-model="category" placeholder="Enter a category">
            </div>
            <div id="search">
                <b>Search:</b>
                <input id="searchBar" type="text" v-model="search" placeholder="Enter a name or key word">
            </div>
        </div>
        <div id="listOfCharities">
        <div id="container" class="container">
            <div class="col">
                <div id="row" class="row">
                    <div id="singleCharity" class="col-sm-4" v-for="char in pagedData">
                            <button id="favoritesButton" class="btn btn-primary btn-sm" @click="addToFavorites(char.charityName, char.tagLine, char.currentRating.ratingImage.large)">Add to Favorites</button>
                            <img :src="char.category.image" alt="Charity Photo">
                            <h5>{{ char.charityName }}</h5>
                            <h6 id="categoryName">{{char.category.categoryName}}</h6>
                            <p>{{ char.tagLine }}</p>
                            <img :src="char.currentRating.ratingImage.large" alt="Charity Rating">
                            <br>
                            <br>
                            <div id="learnMore">
                                <button class="btn btn-success" @click="moreInfo(char.cause.image,char.charityName,char.mission,char.charityNavigatorURL,char.cause.causeName,char.currentRating.rating,char.websiteURL)">Learn More</button>
                            </div>
                        
                        <div id="infoModal">

                          <!-- Creating a modal for learning more about the charity-->
                            <div class="modal-content">
                                <span class="closeButton" @click="closeInfo">&times;</span>
                              <div class="infoHeader">
                                <h2><b>{{charityName}}</b></h2>
                                  <hr>
                              </div>
                              <div class="infoBody">
                                  <img :src="charityCauseImgUrl" alt="Charity Cause Image">
                                  <br>
                                  <br>
                                <h4>Cause</h4>
                                  {{cause}}
                                  <br>
                                  <br>
                                <h4>Mission</h4>
                                  {{charityMission}}
                                  <br>
                                  <br>
                                <h4>Rating Score: <b>{{ratingScore}}</b></h4>
                                  <br>
                                  <br>
                                <h4>How much did you donate?</h4>
                                  <input id="amountDonated" type="text" placeholder="Amount" @click="showDonatedMessage = false">
                                  <button type="submit" class="btn btn-primary" @click="submitDonation">Submit</button>
                                  <br>
                                  <br>
                                  <div id="donatedMessage" v-if="showDonatedMessage">
                                      <p>Donated Successfully Inputted</p>
                                </div>
                                  <div id="review">
                                      <h4>Write A Review!</h4>
                                      <textarea id="textReview" placeholder="Write Review Here"></textarea>
                                      <br>
                                      <button type="submit" class="btn btn-danger" @click="submitReview(charityName)">Submit Review</button>
                                </div>
                              </div>
                              <div class="infoBottom">
                                  <hr>
                                <a id="learnMoreLink" :href="charityNavigatorLink">More Info Here</a>
                                  <a id="donateLink" :href="donateLink">Donate Here</a>
                              </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
        <ul class="pageChangeNav">
                    <li>
                        <button class="pageChange" :disabled="pageNumber === 0" @click="prevPage">
                            <a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
                        </button>
                    </li>
                    <li v-for="p in pageRange">
                        <button class="pageChange" @click="pageChange(p)" :id="activePage(p)"><a href="#">{{ p }}</a></button>
                    </li>
                    <li>
                        <button class="pageChange" :disabled="pageNumber >= pageCount -1" @click="nextPage">
                            <a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>         
                        </button>
                    </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import { donationsRef,dataRef,reviewsRef } from "../database.js";
import firebase from "firebase";

    export default { 
        name: 'charity',
        data () {
            return {
                charData: [],
                pageNumber: 0,
                pageSize: 12,
                visiblePages: 5,
                search: '',
                charityName: '',
                charityMission: '',
                charityCauseImgUrl: '',
                charityNavigatorLink: '',
                cause: '',
                ratingScore: '',
                donateLink: '',
                showDonatedMessage: false,
                category: ''
            }
        },
        firebase: {
            donations: donationsRef,
            data: dataRef,
            reviews: reviewsRef
        },
        computed: {
            //compute the number of pages
            pageCount(){
                var l = this.filteredChar.length
                if (this.category!=''){
                    l = this.filteredCat.length
                }
                var s = this.pageSize;
                return Math.floor(l/s);
            },
            //splits the charity data into pages
            pagedData(){
                const start = this.pageNumber * this.pageSize,
                end = start + this.pageSize;
                if (this.search!=''){
                    return this.filteredChar.slice(start, end);
                }
                if (this.category!=''){
                    return this.filteredCat.slice(start, end);
                }
                return this.filteredChar.slice(start, end);
            },
            pageRange () {
                let start = this.pageNumber - this.visiblePages / 2 <= 0
                ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
                ? Util.lowerBound(this.pageCount - this.visiblePages + 1, 1)
                : Math.ceil(this.pageNumber - this.visiblePages / 2)

                let range = []

                for (let i = 0; i < this.visiblePages && i < this.pageCount; i++) {
                    range.push(start + i-1)
                }
                return range
            },
            filteredChar () {
                return this.charData.filter((char) => { 
                    if (char.charityName.toLowerCase().match(this.search.toLowerCase())) {return true}
                    if (char.mission.toLowerCase().match(this.search.toLowerCase())) {return true}
                    else {return false}
                });
            },
            filteredCat () {
                return this.charData.filter((char) => { 
                    if (char.category.categoryName.toLowerCase().match(this.category.toLowerCase())) {return true}
                    else {return false}
                });
                
            },
            favoriteList(){
                return this.$store.state.favoriteList;
            },
            reviewedCharities(){
                return this.$store.state.reviewedCharities;
            }
        },
        methods: {
            //go to next page
            nextPage(){
                this.pageNumber++;
            },
            //go to prev page
            prevPage(){
                this.pageNumber--;
            },
            pageChange(p){
                this.pageNumber=p;
            },
            //highlight the active page
            activePage (page) {
                return this.pageNumber === page ? 'active' : '';
            },
            moreInfo(imageUrl, name, mission, link, cause, ratingScore, donateLink){
                var modal = document.getElementById('infoModal');
                modal.style.display = "block";
                this.charityName = name;
                this.charityMission = mission;
                this.charityCauseImgUrl = imageUrl;
                this.charityNavigatorLink = link;
                this.cause = cause;
                this.ratingScore = ratingScore;
                this.donateLink = donateLink;
            },
            closeInfo(){
                var modal = document.getElementById('infoModal');
                modal.style.display = "none";
                this.showDonatedMessage = false;
            },
            addToFavorites(name, tagline, image){
                var exists = false;
                for(var place=0; place<this.favoriteList.length; place++){
                    if(this.favoriteList[place].charityName===name){
                        exists = true;
                    }
                }
                if(!exists){
                    this.$store.state.favoriteList.push({
                        charityName: name,
                        charityTagLine: tagline,
                        charityRatingImage: image
                    });
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
            },
            submitDonation(){
                var donatedAmount = parseInt(document.getElementById("amountDonated").value);
                document.getElementById("amountDonated").value="";
                this.$store.state.donatedCharities.push({
                    charityName: this.charityName,
                    donatedAmount: donatedAmount
                })
                this.showDonatedMessage = true;
                donationsRef.push({
                    user: this.$store.state.currentUser,
                    charityName: this.charityName,
                    donatedAmount: donatedAmount
                })
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].email===this.$store.state.currentUser){
                        var user = this.data[i];
                        var total = user.donationTotal + donatedAmount
                        dataRef.child(user['.key']).update({donationTotal: total })
                        if (dataRef.child(user['.key']).donations==false){
                            dataRef.child(user['.key']).update({donations: [
                            {charityName: this.charityName, donatedAmount: donatedAmount}]})
                        }
                        else{
                        dataRef.child(user['.key']).child('donations').push({
                            charityName: this.charityName,
                            donatedAmount: donatedAmount
                        });
                        }
                    }
                }
            },
            submitReview(name){
                var charExists = false;
                var review = document.getElementById("textReview").value;
                document.getElementById("textReview").value="";
                for(var i=0;i<this.reviews.length;i++){
                    if(this.reviews[i].charityName==name){
                        charExists=true;
                        var char = this.reviews[i];
                        reviewsRef.child(char['.key']).child('charityReviews').push({
                            user: this.$store.state.currentUser,
                            review: review
                        })
                    }
                }
                if(!charExists){
                    reviewsRef.push({
                        charityName: name,
                        charityReviews:[{
                            user: this.$store.state.currentUser,
                            review: review
                        }]
                    })
                }
            }
        },
        mounted () {
            axios
                .get('https://api.data.charitynavigator.org/v2/Organizations?app_id=d1095a51&app_key=61c19ae8a70b9bfdf6f1fe21d0f4b244&pageSize=900&rated=true&sort=NAME%3AASC')
                .then(response => (this.charData = response.data))
                .catch(error => console.log(error))
        }
    }
</script>

<style scoped>
    #listOfCharities{
    }
    #charity{
        text-align: center;
    }
    #title{
        margin: 20px;
        text-align: center;
    }
    .pageChangeNav{
        margin-right:35px;
        margin-top:30px;
    }
    .pageChangeNav li {
        display: inline;
    }
    .pageChange{
        margin-right:2px;
        background: none;
    }
    a{
        color: black;
        text-decoration: none;
    }
    #singleCharity{
        border:0.5px solid grey;
        border-radius: 10px;
        margin-top:20px;
        padding-bottom:10px;
    }
    #categoryName{
        color: blue;
    }
    #searchArea{
        background-color:#f2f2f2;
        border:1px solid black;
        margin-top:10px;
        padding-top:20px;
        padding-bottom:20px;
    }
    #filter{
        display: inline;
        float:left;
        margin-left:150px;
    }
    #search{
        display:inline;
        margin-left:250px;
    }
    #searchBar{
        width:220px;
    }
    #favoritesButton{
        position:absolute; 
        top:8px; 
        right:8px;
    }
    /* The modal for learning more about the charity */
    #infoModal {
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.35); 
        overflow: auto;
    }

    /* The information inside of the modal */
    .modal-content {
        margin: 0 auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid black;
        border-radius:10px;
        width: 70%;
    }

    /*    Close button for the modal*/
    .closeButton {
        float: right;
        font-size: 32px;
        color: #A9A9A9;
        text-align: right;
    }

    .closeButton:hover{
        cursor: pointer;
        color: black;
    }
    .infoHeader{
        float:left;
    }
    .infoBody{
        padding-top:10px;
        padding-bottom:10px;
    }
    #learnMoreLink{
        border: 1px solid black;
        padding: 8px 8px 8px 8px;
        border-radius: 5px;
        float:left;
    }
    #learnMoreLink:hover{
        background-color:lightgrey;
    }
    #donateLink{
        float:right;
        border: 1px solid black;
        padding: 8px 8px 8px 8px;
        border-radius: 5px;
        background-color:deepskyblue;
        color:white;
    }
    #donateLink:hover{
        background-color:dodgerblue;
    }
    #textReview{
        width:450px;
        height:150px;
    }
</style>