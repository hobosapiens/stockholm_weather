<template>
  <loader-block v-if="loading"/>
  <div v-else class="widget">
    <photo-block
        :photos="placePhotos"
        :city="placeName"
        :isError="isError"
    />
    <weather-block
        v-if="!isError"
        :weather="weather"
        :city="placeName"
    />
    <search-block
        v-if="!isError"
        :service="service"
        class="search"
        @update="updateData"
        @error="showError"
    />
    <error-block
        v-if="isError"
        class="error"
        @close="closeError"
    />
  </div>
</template>

<script>
import LoaderBlock from "./components/loader-block.vue";
import WeatherBlock from './components/weather-block.vue'
import SearchBlock from './components/search-block.vue'
import PhotoBlock from './components/photo-block.vue'
import ErrorBlock from "./components/error-block.vue";
import {getPlaceData, getWeatherData} from "./api.js";

export default {
  components: {
    ErrorBlock,
    LoaderBlock,
    WeatherBlock,
    SearchBlock,
    PhotoBlock
  },

  data() {
    return {
      weather: {},
      placeName: '',
      placePhotos: [],
      service: new window.google.maps.places.PlacesService(document.createElement('div')),
      loading: true,
      isError: false
    }
  },

  beforeMount() {
    getPlaceData(
        this.service,
        this.defaultPlace.placeId,
        this.defaultPlace.placeName,
        this.updateData
    )
  },

  computed: {
    savedPlace() {
      return JSON.parse(localStorage.getItem('lastPlace'))
    },

    defaultPlace() {
      return this.savedPlace ? this.savedPlace : {
        placeId: 'ChIJywtkGTF2X0YRZnedZ9MnDag',
        placeName: 'Stockholm'
      }
    }
  },

  methods: {
    reformatWeatherData(data) {
      return {
        localTime: this.getTimeByOffset(data?.timezone),
        date: new Date().toLocaleDateString(),
        temperature: Math.round(data?.main.temp),
        description: data?.weather[0]?.description,
        feels_like: Math.round(data?.main.feels_like),
        pressure: data?.main.pressure,
        humidity: data?.main.humidity,
        wind_speed: Math.round(data?.wind.speed),
        icon: data?.weather[0]?.icon
      }
    },

    updateData(city) {
      const {id, name, photos} = city

      if (!photos) return

      const photoUrls = []
      this.loading = true

      photos.forEach(photo => {
        photoUrls.push(photo.getUrl(455, 960))
      })

      this.placeName = name
      this.placePhotos = photoUrls

      localStorage.setItem('lastPlace', JSON.stringify({
        placeId: id,
        placeName: name
      }))

      getWeatherData(name)
          .then(response => {
            if (!response) {
              this.showError()
              localStorage.removeItem('lastPlace')
              getPlaceData(
                  this.service,
                  this.defaultPlace.placeId,
                  this.defaultPlace.placeName,
                  this.updateData
              )
            } else {
              this.weather = this.reformatWeatherData(response)
              this.loading = false
            }
          })
    },

    showError() {
      this.isError = true
      setTimeout(() => {
        this.closeError()
      }, 10000)
    },

    closeError() {
      this.isError = false
    },

    getTimeByOffset(offset) {
      const date = new Date(new Date().getTime() + (offset * 1000))
      const hrs = date.getUTCHours()
      const mins = date.getUTCMinutes()

      const hrsFormatted = hrs.toString().length === 1 ? `0${hrs.toString()}` :  hrs.toString()
      const minsFormatted = mins.toString().length === 1 ? `0${mins.toString()}` :  mins.toString()

      return `${hrsFormatted}:${minsFormatted}`
    },
  }
}
</script>

<style scoped lang="sass">
.widget
  position: relative
  width: 960px
  height: 455px
  box-shadow: -4px 4px 4px 0px rgb(0 0 0 / 50%)

  @media screen and (max-width: 960px)
    width: 720px
    height: 341px

  @media screen and (max-width: 720px)
    width: 540px
    height: 256px

  @media screen and (max-width: 540px)
    width: 100%
    height: 300px
    margin-top: 70px
    margin-bottom: 200px
    box-shadow: none
</style>