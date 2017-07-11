import Vue from 'vue'
import Router from 'vue-router'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMaterial from 'vue-material'

import Event from '@/components/Event'

Vue.use(Router)
Vue.use(VueMaterial)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAeUqdhuvsTFjlBbhSjpdJUv_LvM1bQ6hE',
    v: '3.28'
  }
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Event
    },
    {
      path: '/event',
      name: 'Event Map',
      components: {
        default: Event
      }
    }
  ]
})
