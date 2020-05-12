<template>
    <div>
        <v-navigation-drawer
        color="primary"
      v-model="drawer"
      app>
        <div v-if="currentUser">
            <v-card
                class="mx-auto"
                max-width="434"
                tile
            >
                <v-img
                height="100%"
                src="../assets/user.jpg"
                >
                <v-row
                    align="end"
                    class="fill-height"
                >
                    <v-col
                    align-self="start"
                    class="pa-0"
                    cols="12"
                    >
                    
                    </v-col>
                    <v-col class="py-0">
                    <v-list-item
                        color="rgba(0, 0, 0, .4)"
                        dark
                    >
                        <v-list-item-content>
                        <v-list-item-title class="title">       <h4> {{ currentUser.email }} </h4></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-col>
                </v-row>
                </v-img>
            </v-card>
     
        </div>

      <ul>
          <router-link tag="li" to="/" ><v-icon color="black">home</v-icon> Home </router-link>
          <router-link tag="li" to="/menu" ><v-icon color="black">drive_eta</v-icon> Garage </router-link>
          <router-link tag="li" to="/about"><v-icon color="black">info</v-icon> About </router-link>
          <router-link tag="li" to="/login"><v-icon color="black">person</v-icon> Login </router-link>
          <router-link tag="li" v-if="currentUser" to="/orders" class="darkgrey--text"><v-icon color="darkgrey">assignment</v-icon> Orders </router-link>
          <router-link tag="li" to="/admin"><v-icon color="red" >lock</v-icon> Admin </router-link>

          
      </ul>

    </v-navigation-drawer>

    <v-app-bar
      app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline">
          <span>Auto</span>
          <span class="font-weight-light">Shop</span>
          </v-toolbar-title>
    </v-app-bar>
    </div>
</template>

<script>

import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store.js'

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        store.dispatch('setUser', user)
    }
    else {
        store.dispatch('setUser',null)
    }
});

export default {
    data: () => ({
      drawer: null,
    }),
    computed: {
        currentUser() {
            return this.$store.getters.currentUser
        }
    }
}
</script>

<style lang="scss">
    nav ul {
        padding:0;
        margin-top:20px;
        text-decoration:none;
    }
    nav li {
        color:black;
        margin-left:15px;
        padding:5px;
        list-style-type:none;
        cursor:pointer;
    }
    nav li i {
        margin-right:10px;
    }
    nav li:last-child {
        position: absolute;
        bottom:40px;
        color: red;
    }
</style>