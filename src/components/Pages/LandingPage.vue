<template>
  <v-container fluid
                :class="$vuetify.breakpoint.smAndDown ? 'pa-1' : 'pa-2'">  
    <v-layout column >
  
      <title-view :title="envidatTitle"
                  :slogan="envidatSlogan"
                  :subSlogan="envidatSubSlogan"
                  :buttonText="sloganButtonText"
                  :buttonCallback="catchBrowseClicked" >
      </title-view>

      <v-flex mt-5 offset-md6>
        <search-bar-view
                      :labelText="labelText"
                      :buttonText="buttonlText"
                      :hasButton="true"
                      v-on:clicked="catchSearchClicked">
        </search-bar-view>
      </v-flex>

      <v-flex mt-5 offset-md6>
    
        <v-container fluid grid-list-md pa-0>
          <v-layout row wrap>
    
            <v-flex my-1 xs6
              v-for="card in categorycards" :key="card.title">
    
              <base-click-card :title="card.title"
                            :img="card.img"
                            v-on:clicked="catchCategoryClicked"
                            />
    
            </v-flex>

          </v-layout>
        </v-container>
    
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { BROWSE_PATH } from '@/router/routeConsts';
  import BaseClickCard from '@/components/BaseElements/BaseClickCard';
  import TitleView from '@/components/Views/TitleView';
  import SearchBarView from '@/components/Filtering/SearchBarView';
  import {
    SET_APP_BACKGROUND,
    SET_CURRENT_PAGE,
  } from '@/store/mutationsConsts';


  // Login & Register form and animation
  // https://codepen.io/yusufbkr/pen/RPBQqg

  // This animation is a bit smoother
  // https://codepen.io/andytran/pen/RPBdgM

  // Here is one with a progress button/bar
  // https://codepen.io/suez/pen/dPqxoM

  export default {
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
      next((vm) => {
        // console.log("landing beforeRouteEnter to: " + to + " from: " + from + " next: " + next);
        vm.$store.commit(SET_CURRENT_PAGE, 'landingPage');
        vm.$store.commit(SET_APP_BACKGROUND, vm.PageBGImage);
      });
    },
    computed: {
      ...mapGetters({
        categorycards: 'metadata/categorycards',
      }),
    },
    methods: {
      catchCategoryClicked: function catchCategoryClicked(cardTitle) {
        // sleep(500);
        // setTimeout(this.$router.push({ name: 'BrowsePage', params: { cardTitle }}), 1000);

        if (cardTitle.includes('login')) {
          this.catchLoginclick();
          return;
        }

        this.$router.push({
          path: BROWSE_PATH,
          query: {
            search: cardTitle,
          },
        });
      },
      catchSearchClicked: function catchSearchClicked(search) {
        this.$router.push({
          path: BROWSE_PATH,
          query: { search },
        });
      },
      catchBrowseClicked: function catchBrowseClicked() {
        this.$router.push({
          path: BROWSE_PATH,
          // query: { '' },
        });
      },
      catchEnterclick: function catchEnterclick() {
        this.redirectToDashboard();
      },
      catchSingupclick: function catchSingupclick() {
        this.redirectToDashboard();
      },
      catchLoginclick: function catchLoginclick() {
        this.redirectToDashboard();
      },
      redirectToDashboard: function redirectToDashboard() {
        window.open('https://www.envidat.ch/user/reset', '_blank');
        // window.location.href = 'https://www.envidat.ch/user/reset';
        // this.$router.push('https://www.envidat.ch/user/reset');
      },
    },
    data: () => ({
      PageBGImage: './app_b_landingpage.jpg',
      labelText: "Search for research data topics ex. 'Avalanche'",
      buttonlText: 'SEARCH DATA',
      envidatTitle: 'EnviDat',
      // envidatSlogan: 'Browse a comprehensive collection of environmental data from Switzerland',
      envidatSlogan: 'Environmental Research Data<br/>at your Fingertips',
      // envidatSlogan: 'Environmental Research Data at your Fingertips. Provided by the many research units of the Swiss Federal Institute for Forest, Snow and Landscape WSL.',
      envidatSubSlogan: 'The data is being provided by the many research units of the Swiss Federal Institute for Forest, Snow and Landscape WSL.',
      sloganButtonText: 'BROWSE DATA',
      loginInfos: {
        titleText: 'Do you create data?',
        loginText: 'Creator Login',
        signupText: 'SIGN UP',
        loggedIn: false,
        loggedinText: 'ENTER DASHBOARD',
      },
    }),
    components: {
      TitleView,
      SearchBarView,
      BaseClickCard,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  
</style>
