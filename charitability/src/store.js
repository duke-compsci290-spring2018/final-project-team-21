import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        currentUser:'',
        userImgUrl: '',
        isAdmin: false,
        goal: 0,
        donationTotal: 0,
        favoriteList: [],
        donatedCharities: []
    },
    mutations: {
        setUser(state, payload) {
            state.currentUser = payload.email; 
            state.userImgUrl = payload.photoURL;
            if(payload.email=='admin@admin.com'){
                state.isAdmin=true;
            } 
        }
    },
    actions: {
        autoSignIn ({commit}, payload) {
            commit('setUser', {email: payload.email, photoURL:payload.photoURL})
        }
    },
    getters: {
        getUser: (state) => {
            return state.currentUser; 
        }
    }
});