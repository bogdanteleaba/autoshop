<template>
  <v-app id="app" dark>
    <navigation/>
    

    <v-content>
      <v-container>
       <router-view></router-view>
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
import Navigation from './components/Navigation';

  export default {
    components: {
      Navigation
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

<style lang="scss">
  main {
    background-image: url('./assets/background2.jpg');
      -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height:1000px;
  }
  .col h1{
    border: 5px white solid;
    text-align:right;
    color:white;
    text-transform:uppercase;
    margin:bottom;
    padding:15px;
}
    .col:last-child h1{
    text-align:left;
}
    #info {
        background-color:white;
    }
</style>