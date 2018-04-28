<template>
    <div id="home">
        <div> 
            <input type="text" v-model="search" placeholder="Enter a name or related word">
        </div>
        <h3 id="title">Charities</h3>

        <div id="pageddata">
               <ul>
                  <li v-for="char in pagedData">
                    <h5>{{ char.charityName }}</h5>
                    <h6>{{ char.ein }}</h6>
                    <p>{{ char.mission }}</p>
                    <hr>
                  </li>
               </ul>
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
    </div>
</template>

<script>
import axios from "axios";

    export default { 
        name: 'home',
        data () {
            return {
                charData: [],
                pageNumber: 0,
                pageSize: 10,
                visiblePages: 5,
                search: ''
            }
        },
        computed: {
            //compute the number of pages
            pageCount(){
                let l = this.filteredChar.length,
                s = this.pageSize;
                return Math.floor(l/s);
            },
            //splits the charity data into pages
            pagedData(){
                const start = this.pageNumber * this.pageSize,
                end = start + this.pageSize;
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
    #home{
        text-align: center;
    }
    #title{
        margin: 20px;
        text-align: center;
    }
    ul {
        list-style-type: none;
    }
    .pageChangeNav li {
        display: inline;
    }
    .pageChange{
        background: none;
    }
    #active {
        background-color: beige; 
    }
    a{
        color: black;
        text-decoration: none;
    }
</style>