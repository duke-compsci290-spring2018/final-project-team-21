import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        currentUser:'',
        UserloggedIn: false,
        userImgUrl: ""
    },
    mutations: {
        setUser(state, payload) {
            state.currentUser = payload.email; 
            if (state.currentUser){
                state.UserLoggedIn=true;
            }
            else {
                state.UserLoggedIn=false;
            }
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