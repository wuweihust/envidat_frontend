<template>

    <v-chip
        small
        class="envidatChip"
        :class="{ 'white--text': highlighted ? true : false,
                  'smallChip': $vuetify.breakpoint.smAndDown ? true : false,
                }"
        v-bind="{['close'] : closeable,
                 ['color']: highlighted ? 'primary' : '',
                 ['disabled'] : !selectable,
                 }"
        :style="{'height' : $vuetify.breakpoint.xsOnly ? '15px' : '' }"
        @click.stop="clicked"
        @input="clickedClose">
        {{ name }}
    </v-chip>

</template>

<script>
  export default {
    props: {
      name: String,
      closeable: Boolean,
      selectable: Boolean,
      highlighted: Boolean,
      count: Number,
    },
    computed: {
    },
    methods: {
      clicked: function clicked() {
        if (!this.selectable) {
          return;
        }

        this.$emit('clicked', this.name);
      },
      clickedClose: function clickedClose() {
        this.$emit('clickedClose', this.name);
      },
    },
  };
</script>

<style scoped>
</style>