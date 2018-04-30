<template>
    <div id="charity">
        <div id="searchArea">
            <!--search categories-->
            <div id="filter">
                <b>Category:</b>
                <input id="searchBar" type="text" v-model="category" placeholder="Enter a category">
            </div>
            <!--search charity names and missions-->
            <div id="search">
                <b>Search:</b>
                <input id="searchBar" type="text" v-model="search" placeholder="Enter a name or key word">
            </div>
        </div>
        <!--charities-->
        <div id="listOfCharities">
        <div id="container" class="container">
            <div class="col">
                <div id="row" class="row">
<!--                    single charity entry creation-->
                    <div id="singleCharity" class="col-sm-4" v-for="char in pagedData">
<!--                        add to favorites button-->
                            <button id="favoritesButton" class="btn btn-primary btn-sm" @click="addToFavorites(char.charityName, char.tagLine, char.currentRating.ratingImage.large)">Add to Favorites</button>
                            <img :src="char.category.image" alt="Charity Photo">
                            <h5>{{ char.charityName }}</h5>
                            <h6 id="categoryName">{{char.category.categoryName}}</h6>
                            <p>{{ char.tagLine }}</p>
                            <img :src="char.currentRating.ratingImage.large" alt="Charity Rating">
                            <br>
                            <br>
<!--                        creating the learn more button-->
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
<!--                                  information in the modal-->
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
<!--                                  writing a review-->
                                  <div id="review">
                                      <h4>Write A Review!</h4>
                                      <textarea id="textReview" placeholder="Write Review Here"></textarea>
                                      <br>
                                      <button type="submit" class="btn btn-danger" @click="submitReview(charityName)">Submit Review</button>
                                </div>
                              </div>
                              <div class="infoBottom">
<!--                                  information at the bottom-->
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
        <!-- navigation to view more pages of charities-->
        <ul class="pageChangeNav">
                    <li>
<!--                        button for navigation-->
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
        <br>
        <br>
        <a v-if="isAdmin" href="https://api.data.charitynavigator.org/v2/Organizations?app_id=d1095a51&app_key=61c19ae8a70b9bfdf6f1fe21d0f4b244&pageSize=900&rated=true&sort=NAME%3AASC">Link to JSON Charities</a>
        <br>
        <br>
        <a v-if="isAdmin" @click="dataShown">Link to JSON Firebase Data</a>
        <br>
        <br>
        <a v-if="isAdmin"@click="reviewsData">Link to JSON Firebase ReviewsData</a>
        <br>
        <br>
        <a v-if="isAdmin" @click="donationsData">Link to JSON Firebase donationsData</a>
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
                charData: [], //charity data from api
                pageNumber: 0, 
                pageSize: 12, //number of charities on each page
                visiblePages: 5, 
                search: '',
                //data for the modals
                charityName: '',
                charityMission: '',
                charityCauseImgUrl: '',
                charityNavigatorLink: '',
                cause: '',
                ratingScore: '',
                donateLink: '',
                showDonatedMessage: false,
                //determine a category
                category: ''
            }
        },
        firebase: {
            //determining firebase information
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
            //number of pages
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
            //charities filtered by name and mission
            filteredChar () {
                return this.charData.filter((char) => { 
                    if (char.charityName.toLowerCase().match(this.search.toLowerCase())) {return true}
                    if (char.mission.toLowerCase().match(this.search.toLowerCase())) {return true}
                    else {return false}
                });
            },
            //charities filtered by category
            filteredCat () {
                return this.charData.filter((char) => { 
                    if (char.category.categoryName.toLowerCase().match(this.category.toLowerCase())) {return true}
                    else {return false}
                });
                
            },
            //returns the list of favorites
            favoriteList(){
                return this.$store.state.favoriteList;
            },
            //returns the charities reviewed
            reviewedCharities(){
                return this.$store.state.reviewedCharities;
            },
            //returns true if the current user is an admin
            isAdmin(){
                return this.$store.state.isAdmin;
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
            //opens modal with more information on charity
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
            //closes modal
            closeInfo(){
                var modal = document.getElementById('infoModal');
                modal.style.display = "none";
                this.showDonatedMessage = false;
            },
            //add a charity to current user's list of favorites
            addToFavorites(name, tagline, image){
                var exists = false;
                for(var place=0; place<this.favoriteList.length; place++){
                    if(this.favoriteList[place].charityName===name){
                        exists = true;
                    }
                }
                //determining if favorite lists exists already or not
                if(!exists){
                    this.$store.state.favoriteList.push({
                        charityName: name,
                        charityTagLine: tagline,
                        charityRatingImage: image
                    });
                    //pushing to dataRef for the firebase
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
            //allows user to submit donation amount
            submitDonation(){
                var donatedAmount = parseInt(document.getElementById("amountDonated").value);
                document.getElementById("amountDonated").value="";
                this.$store.state.donatedCharities.push({
                    charityName: this.charityName,
                    donatedAmount: donatedAmount
                })
                this.showDonatedMessage = true;//determining whether to show donation message
                //pushing the donations to firebase
                donationsRef.push({
                    user: this.$store.state.currentUser,
                    charityName: this.charityName,
                    donatedAmount: donatedAmount
                })
                //pushing donations to dataRef in firebase
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
            //allows user to submit a review on a charity
            submitReview(name){
                var charExists = false;//determine if charity exists
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
                //is charity exists then add to the comments array
                if(!charExists){
                    reviewsRef.push({
                        charityName: name,
                        charityReviews:[{
                            user: this.$store.state.currentUser,
                            review: review
                        }]
                    })
                }
            },
            //three methods to show json data for the users
            dataShown(){
                var myWindow = window.open("");
                myWindow.document.write(JSON.stringify(this.data));
            },
            reviewsData(){
                var myWindow = window.open("");
                myWindow.document.write(JSON.stringify(this.reviews));
            },
            donationsData(){
                var myWindow = window.open("");
                myWindow.document.write(JSON.stringify(this.donations));
            }
        },
        //retrieves data from charity navigator api
        mounted () {
            axios
                .get('https://api.data.charitynavigator.org/v2/Organizations?app_id=d1095a51&app_key=61c19ae8a70b9bfdf6f1fe21d0f4b244&pageSize=900&rated=true&sort=NAME%3AASC')
                .then(response => (this.charData = response.data))
                .catch(error => console.log(error))
        }
    }
</script>

<style scoped>
/*    styling for overall charity div*/
    #charity{
        text-align: center;
    }
    #title{
        margin: 20px;
        text-align: center;
    }
/*    styling the page navigation at the bottom of the page*/
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
/*    styling a single charity entry*/
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
/*    styling search bar*/
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
/*    styling for the modal*/
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
/*    styling learn more link*/
    #learnMoreLink{
        border: 1px solid black;
        padding: 8px 8px 8px 8px;
        border-radius: 5px;
        float:left;
    }
    #learnMoreLink:hover{
        background-color:lightgrey;
    }
/*    styling donation links*/
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
/*    styling for text review*/
    #textReview{
        width:450px;
        height:150px;
    }
</style>