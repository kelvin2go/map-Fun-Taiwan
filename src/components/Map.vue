<template>
  <div>
    <h2>We have {{ markers.length }} events in Taiwan!</h2>
    <div>
      <md-card  v-if="activeEvent">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{s2t(activeEvent.title)}}</div>
          </md-card-header-text>

          <md-icon class="md-clear" @click="activeEvent = null">x</md-icon>
        </md-card-header>

        <md-card-media>
          <img :src="activeEvent.image">
        </md-card-media>

        <md-card-content v-html="s2t(activeEvent.content)">
        </md-card-content>
      </md-card>

    </div>
    <gmap-map
      :center="center"
      :zoom="13"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position; activeEvent=m.event; opened=true"
      >
        <gmap-info-window :opened="m.ifw" :content="m.ifw2text" @click="detailContent=m.content"></gmap-info-window>
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  import Chinese from 'chinese-s2t'
  export default {
    data () {
      return {
        center: {lat: 25.0330, lng: 121.5654},
        activeEvent: null,
        opened: false
      }
    },
    methods: {
      s2t: (text) => {
        return Chinese.s2t(text)
      },
      close: () => {
        this.opened = false
      }
    },
    props: ['markers']
  }
</script>

<style scoped>
.vue-map-container{
  min-width: 680px;
  min-height: 500px;
  width: 100%;
  height: 100%;
}
.md-theme-default.md-card {
  width: 95%;
  margin: 0 auto;
}
.md-card .md-card-media img{
  width: auto;
  max-width: 100%;
}
</style>
