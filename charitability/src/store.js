import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        currentUser:'',
        userImgUrl: ''
    },
    mutations: {
        setUser(state, payload) {
            state.currentUser = payload.email; 
        },
    },
    actions: {
        autoSignIn ({commit}, payload) {
            commit('setUser', {email: payload.email})
        }
    },
    getters: {
        getUser: (state) => { 
            return state.currentUser; 
        }
    }
});