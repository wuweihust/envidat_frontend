<template>
  <v-layout column>
    <v-flex xs12 py-4
            :style="`font-weight: 700; background-color: ${$vuetify.theme.errorHighlight}`" >
      <h2>{{ noResultText }}</h2>
    </v-flex>

    <v-flex xs12 >
      <h3>{{ suggestionText }}</h3>
    </v-flex>

    <v-flex xs12
            pt-2
            >
      <v-container fluid grid-list-md pa-0>
        <v-layout row wrap>

          <v-flex my-2 px-1
              v-bind="{ 'xs3' : $vuetify.breakpoint.xsOnly ? false : true,
                        'xs6' : $vuetify.breakpoint.xsOnly ? true : false,
                      }"                  
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
</template>


<script>
  import { mapGetters } from 'vuex';
  import BaseClickCard from '@/components/BaseElements/BaseClickCard';

  export default {
    props: {
      noResultText: String,
      suggestionText: String,
    },
    computed: {
      ...mapGetters({
        categorycards: 'metadata/categorycards',
      }),
    },
    methods: {
      catchCategoryClicked: function catchCategoryClicked(cardTitle) {
        this.$emit('clicked', cardTitle);
      },
    },
    components: {
      BaseClickCard,
    },
  };
</script>
