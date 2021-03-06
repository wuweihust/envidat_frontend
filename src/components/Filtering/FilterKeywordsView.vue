<template>
  <v-card raised
          :style="this.compactLayout ? '' : 'height: 85px'"
  >

    <v-layout column
    >

      <v-flex xs12 hidden-sm-and-up
              px-2 py-2
              v-if="!expanded">
        <div class="mx-3">Filter for Keywords</div>
      </v-flex>


      <v-flex xs12 px-2 mt-2
                v-if="expanded || $vuetify.breakpoint.smAndUp">

        <v-layout row
                  fill-height
                  v-bind="{
                    ['align-center']: this.$vuetify.breakpoint.smAndUp,
                    ['align-content-center']: this.$vuetify.breakpoint.smAndUp,
                  }"
        >

            <v-flex pl-2
                    class="metadataInfoIcon" 
            >
              <base-icon-label-view :icon="tagsIcon"
                                :compactLayout="compactLayout"
                                iconTooltip="Possible Keywords"
              />
            </v-flex>

            <v-flex xs12
                    py-0
                    px-2
                    v-if="showPlaceholder"
            >

              <tag-chip-placeholder py-0
                        v-for="n in 6" :key="n"
                        class="card_tag_placeholder" />              

            </v-flex>

            <v-flex xs12
                    py-0
                    px-2 
                    v-if="!showPlaceholder && showPopularTags"
            >

              <tag-chip v-for="tag in showPopularTags"
                        :key="tag.name" 
                        :name="tag.name"
                        :selectable="tag.enabled"
                        :highlighted="false"
                        :closeable="false"
                        v-on:clicked="catchTagClicked($event, tag.name)"
                        class="filterTag" />

            </v-flex>


        </v-layout>

      </v-flex>


      <v-flex xs12 px-2 mt-2
              v-if="expanded || $vuetify.breakpoint.smAndUp">

        <v-layout row
                  fill-height
                  v-bind="{
                    ['align-center']: this.$vuetify.breakpoint.smAndUp,
                    ['align-content-center']: this.$vuetify.breakpoint.smAndUp,
                  }"
        >

            <v-flex pl-2 class="metadataInfoIcon" 
            >
              <base-icon-label-view :icon="tagIcon"
                                :compactLayout="compactLayout"
                                iconTooltip="Active Keyword filter"
              />
            </v-flex>

            <v-flex xs12
                    py-0
                    px-2
                    v-if="selectedTags.length > 0"
            >

              <tag-chip v-for="tag in selectedTags" :key="tag.name" 
                        :name="tag.name"
                        :selectable="true"
                        :highlighted="true"
                        :closeable="true"
                        v-on:clickedClose="catchTagCloseClicked($event, tag.name)"
                        v-on:clicked="catchTagCloseClicked($event, tag.name)"
                        class="filterTag" />

            </v-flex>

        </v-layout>

      </v-flex>

    </v-layout>

    <v-card-actions v-if="$vuetify.breakpoint.xsOnly"
                    class="ma-0 pa-1"
                    style="position: absolute; bottom: 0px; right: 0px;">
      <v-spacer />

      <base-icon-button :count="selectedTags.length"
                        materialIconName="expand_more"
                        color="secondary"
                        iconColor="secondary"
                        :outlined="true"
                        :isSmall="true"
                        :rotateOnClick="true"
                        :rotateToggle="filterExpanded"
                        v-on:clicked="catchExpandClicked"
                        />

    </v-card-actions>


  </v-card>

</template>

<script>
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import TagChip from '@/components/Cards/TagChip';
import TagChipPlaceholder from '@/components/Cards/TagChipPlaceholder';
import FilterViewButtons from '@/components/Filtering/FilterViewButtons';

export default {
  props: {
    selectedTagNames: Array,
    popularTags: Array,
    allTags: Array,
    expanded: Boolean,
    expandButtonText: String,
    expandedButtonText: String,
    showPlaceholder: Boolean,
    mapExpanded: Boolean,
    mapExpandButtonText: String,
    mapExpandedButtonText: String,
    isHighlighted: Boolean,
    compactLayout: Boolean,
  },
  beforeMount: function beforeMount() {
    this.tagIcon = this.mixinMethods_getIcon('tag');
    this.tagsIcon = this.mixinMethods_getIcon('tags');
  },
  computed: {
    selectedTags: function selectedTags() {
      // always get the selected as a subset of the allTags because they are the full
      // tag JSON object
      const selecteds = [];

      if (this.selectedTagNames !== undefined && this.selectedTagNames.length > 0) {
        for (let i = 0; i < this.selectedTagNames.length; i++) {
          const element = this.selectedTagNames[i];

          selecteds.push({ name: element, enabled: true });
        }
      }

      return selecteds;
    },
    showPopularTags: function showPopularTags() {
      // use this computed property to make the diff between popular and selected
      const popTags = [];

      this.popularTags.forEach((element) => {
        if (element.enabled && !this.isTagSelected(element.name)) {
          popTags.push(element);
        }
      });

      return popTags;
    },
    maxTagNumber: function maxTagNumber() {
      return this.getTagMaxAmout(this.selectedTags, this.maxSelectedTagsTextLength);
    },
    maxPopularTagNumber: function maxPopularTagNumber() {
      let maxTextLength = this.maxPopularTagsTextLength;

      if (this.$vuetify.breakpoint.xsOnly) {
        maxTextLength = this.xsTextLength;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        maxTextLength = this.smTextLength;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        maxTextLength = this.mdTextLength;
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        maxTextLength = this.mdTextLength;
      }

      const maxNumber = this.getTagMaxAmout(this.popularTags, maxTextLength);
      const combinedMax = maxNumber - this.selectedTags.length;

      return combinedMax >= 0 ? combinedMax : 0;
    },
    dynamicLayout: function dynamicLayout() {

    },
  },
  methods: {
    clearTags: function clearTags() {
      this.$emit('clickedClear');
    },
    isCleanTag: function isCleanTag(tagName) {
      let maxWordsPerTag = 3;

      if (this.$vuetify.breakpoint.xsOnly) {
        maxWordsPerTag = 2;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        maxWordsPerTag = 20;
      }

      return tagName.split(' ').length <= maxWordsPerTag;
    },
    getTagMaxAmout: function getTagMaxAmout(list, maxTextLength) {
      let textLength = 0;
      let numberOfTags = 0;

      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          const tag = list[i];

          if (tag) {
            textLength += tag.name.length + 1;

            if (textLength >= maxTextLength) {
              break;
            }

            numberOfTags++;
          }
        }
      }

      // console.log("numberOfTags " + numberOfTags + " " + textLength);
      return numberOfTags;
    },
    catchExpandClicked: function catchExpandClicked() {
      this.filterExpanded = !this.filterExpanded;
      this.$emit('clickedExpand');
    },
    catchMapExpandClicked: function catchMapExpandClicked() {
      this.$emit('clickedMapExpand');
    },
    catchTagClicked: function catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
    catchTagCloseClicked: function catchTagCloseClicked(tagId) {
      this.$emit('clickedTagClose', tagId);
    },
    isTagSelected: function isTagSelected(tagName) {
      if (!tagName || this.selectedTagNames === undefined) {
        return false;
      }

      return this.selectedTagNames.indexOf(tagName) >= 0;
    },
    isPopluarTag: function isPopluarTag(tagName) {
      if (!tagName || this.popularTags === undefined) {
        return false;
      }

      return this.popularTags.findIndex(obj => obj.name === tagName) >= 0;
    },
    isSelected: function isSelected(tagId) {
      return this.selectedTags.indexOf(tagId) >= 0;
    },
    minTagCountToBeVisible: function minTagCountToBeVisible() {
      let minCount = 5;

      if (this.$vuetify.breakpoint.xsOnly) {
        minCount = 25;
      } else if (this.$vuetify.breakpoint.smAndDown) {
        minCount = 20;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        minCount = 10;
      }

      return minCount;
    },
  },
  data: () => ({
    maxSelectedTagsTextLength: 25,
    maxPopularTagsTextLength: 250,
    xsTextLength: 25,
    smTextLength: 50,
    mdTextLength: 65,
    tagIcon: null,
    tagsIcon: null,
    filterExpanded: false,
  }),
  components: {
    BaseIconLabelView,
    BaseIconButton,
    TagChip,
    TagChipPlaceholder,
    FilterViewButtons,
  },
};
</script>

<style>

  .envidat_subheading {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    opacity: 0.85;
  }

</style>



