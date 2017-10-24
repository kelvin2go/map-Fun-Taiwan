<template>
  <div class="mapFun">
    <md-spinner md-indeterminate v-if="loading"></md-spinner>
    <mapfun v-if="apiMarkers" :markers="apiMarkers"></mapfun>
  </div>
</template>

<script>
import Map from '@/components/Map'
import axios from 'axios'
import Chinese from 'chinese-s2t'
// import _ from 'lodash'

// const API = 'https://api.myjson.com/bins/rm07z'
const API = 'https://kelvin.stdlib.com/getapi/'

const HTTP = axios.create({
  baseURL: `https://api.douban.com/v2/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'withCredentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Authentication',
    'Access-Control-Allow-Credentials': true
  }
})

export default {
  name: 'event',
  data () {
    return {
      errors: [],
      loading: true
    }
  },
  components: {
    mapfun: Map
  },
  props: ['apiMarkers'],
  methods: {
    makeList: (ary) => {
      var rObj = []
      for (let event of ary.events) {
        let geo = event.geo.split(' ')
        if (geo[0] !== '0.0' && geo[0] > 22 && geo[0] < 28) {
          rObj.push({
            id: event.id,
            position: {
              lat: parseFloat(geo[0]),
              lng: parseFloat(geo[1])
            },
            enable: true,
            ifw2: true,
            ifw2text: Chinese.s2t(event.title),
            event
          })
        }
      }
      return rObj
    }
  },
  created () {
    this.loading = true
    HTTP.get(API)
    .then(response => {
      console.log(response.data)
      this.apiMarkers = this.makeList(response.data)
      console.log('done')
      console.log(this.apiMarkers)
      this.loading = false
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.mapFun{
  width: 100%;
}
</style>
