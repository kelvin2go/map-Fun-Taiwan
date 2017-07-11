<template>
  <div>
    <h2> 台灣 現在有 <md-chip class="md-warn">{{ markers.length }}</md-chip> 組活動!</h2>
    <div>
      <md-card class="modalContainer" v-if="activeEvent">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{s2t(activeEvent.event.title)}}</div>
            <div class="phone-viewport">
              <md-list>
                <md-list-item>
                  <md-icon>date_range</md-icon> <span> {{activeEvent.event.begin_time}} - {{activeEvent.event.end_time}}</span>
                </md-list-item>
                <md-list-item>
                  <md-icon>room</md-icon> <span><a :href="geoLink(activeEvent)" target="_blank">{{activeEvent.event.address}}</a></span>
                </md-list-item>
                <md-list-item>
                  <md-icon>attach_money</md-icon> <span>{{activeEvent.event.price_range}}</span>
                </md-list-item>
              </md-list>
            </div>
          </md-card-header-text>
          <md-button @click="activeEvent = null"><md-icon >clear</md-icon></md-button>
        </md-card-header>

        <md-card-media>
          <img :src="activeEvent.event.image">
        </md-card-media>

        <md-card-content v-html="s2t(activeEvent.event.content)">
        </md-card-content>

        <a :href="activeEvent.event.url" target="_blank"><md-icon>link</md-icon> <span>原鏈</span></a>
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
        @click="center=m.position; activeEvent=m; opened=true"
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
      },
      geoLink: (event) => {
        console.log('DFX')
        console.log(event)
        // console.log('geo: ' + this.activeEvent.position.lat + ',' + this.activeEvent.position.lng + ',u=35')
        return `geo: ${event.position.lat},${event.position.lng},u=35`
      }

    },
    props: ['markers']
  }
</script>

<style scoped>
.modalContainer{
  position: absolute;
  width: 98%;
  top: 30px;
  left: 30px;
}
.vue-map-container{
  min-width: 680px;
  min-height: 500px;
  width: 100%;
  height: 100%;
}
.subinfo{
  text-align: left;
}
.md-card .md-card-header .md-button:last-child{
  position: absolute;
  right: 6px;
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
