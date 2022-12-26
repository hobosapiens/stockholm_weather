<template>
  <div v-if="loading" class="loader">
    <img src="./assets/loader.gif" alt="loader" class="loader-image">
    <div class="loader-text">Loading...</div>
  </div>
  <div v-else class="city-background">
    <weather-block :weather="weather" />
    <div class="city-image">
      <div class="search">
        <search-block @update="updateData" :service="service" />
      </div>
      <photo-block :photos="placePhotos" :city="placeName" />
    </div>
  </div>
</template>

<script>
import WeatherBlock from './components/weather-block.vue'
import SearchBlock from './components/search-block.vue'
import PhotoBlock from './components/photo-block.vue'
import {getPlaceData, getWeatherData} from "./api.js";

export default {
  components: {
    WeatherBlock,
    SearchBlock,
    PhotoBlock
  },

  data() {
    return {
      weather: {},
      placeName: '',
      placePhotos: [],
      service: new google.maps.places.PlacesService(document.createElement('div')),
      loading: true
    }
  },

  beforeMount() {
    const savedPlace = JSON.parse(localStorage.getItem('lastPlace'))
    const defaultPlace = savedPlace
        ? savedPlace
        : {
            placeId: 'ChIJywtkGTF2X0YRZnedZ9MnDag',
            placeName: 'Stockholm'
          }

    getPlaceData(
        this.service,
        defaultPlace.placeId,
        defaultPlace.placeName,
        this.updateData
    )

    getWeatherData(defaultPlace.placeName)
        .then(response => {
          this.weather = this.reformatWeatherData(response)
          this.loading = false
        })
  },

  methods: {
    reformatWeatherData(data) {
      return {
        city: data.name,
        date: new Date().toLocaleDateString(),
        temperature: Math.round(data.main.temp),
        description: data?.weather[0]?.description,
        feels_like: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind_speed: Math.round(data.wind.speed),
        icon: data?.weather[0]?.icon
      }
    },

    updateData(city) {
      const { id, name, photos } = city

      if(!photos) return

      const photoUrls = []
      this.loading = true

      photos.forEach(photo => {
        photoUrls.push(photo.getUrl())
      })

      this.placeName = name
      this.placePhotos = photoUrls

      localStorage.setItem('lastPlace', JSON.stringify({
        placeId: id,
        placeName: name
      }))

      getWeatherData(name)
          .then(response => {
            this.weather = this.reformatWeatherData(response)
            this.loading = false
          })
    },
  }
}
</script>

<style scoped lang="sass">
.city-background
  display: flex
  position: relative
  box-shadow: -4px 4px 4px 0px rgb(0 0 0 / 50%)
  border-radius: 50px
  overflow: hidden
.city-image
  position: relative
  height: 434px
  width: 600px
  img
    max-height: 100%
.search
  position: absolute
  left: 40px
  top: 40px
</style>
