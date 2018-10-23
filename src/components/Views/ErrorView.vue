<template>
  <v-container fluid grid-list-lg pa-3>

    <v-layout>

      <v-flex xs10 offset-xs1 >

        <v-card >

          <v-card-media style="background-color: #ff5252 !important;"
                        height="100">

            <v-layout column pa-3 >

              <v-flex >
                <div class="headline">An Error occured</div>
              </v-flex>

            </v-layout>

          </v-card-media>

          <v-layout column pa-3 >

            <v-flex>Error: {{ errorText }}</v-flex>

            <v-flex>{{ hintText }}</v-flex>

            <v-layout row v-if="showButton">

              <v-flex xs3>
              </v-flex>
            </v-layout>

          </v-layout>

          <v-card-actions>
            <v-spacer />

            <v-btn v-if="showReportButton"
                  @click.native="buttonCallback" href="mailto:envidat@wsl.ch">
              {{ reportButtonText }}
            </v-btn>

            <v-btn @click.native="buttonCallback">
              {{ buttonText }}
            </v-btn>
          </v-card-actions>

        </v-card>        

      </v-flex>

    </v-layout>
  </v-container>
</template>


<script>
export default {
  props: {
    title: String,
    errorText: String,
    hintText: String,
    showButton: Boolean,
    buttonText: String,
    buttonCallback: Function,
    backPath: String,    
    showReportButton: Boolean,
    reportButtonText: String,
  },
  computed: {
    path: function path() {
      return `/${this.backPath}/`;
    },
    titleText: function titleText() {
      return this.title ? this.title : 'An Error occured';
    }
  },
  methods: {
    reload: function reload(){
      // window.refresh?
    },
  },
  data: () => ({
    reloadText: 'Try reloading',
  }),
};
</script>
