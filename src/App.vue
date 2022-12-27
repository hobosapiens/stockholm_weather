<template>
  <loader-block v-if="loading"/>
  <div v-else class="weather">
    <weather-block :weather="weather"/>
    <div class="photo">
      <search-block
          :service="service"
          class="search"
          @update="updateData"
          @error="showError"
      />
      <photo-block :photos="placePhotos" :city="placeName"/>
    </div>
  </div>
  <error-block v-if="isError" class="error"/>
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
      service: new google.maps.places.PlacesService(document.createElement('div')),
      loading: true,
      isError: false
    }
  },

  beforeMount() {
    this.getPlaceDataFromApi()
    this.getWeatherDataFromApi(this.defaultPlace.placeName)
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
    },
  },

  methods: {
    reformatWeatherData(data) {
      return {
        city: data?.name,
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
        photoUrls.push(photo.getUrl())
      })

      this.placeName = name
      this.placePhotos = photoUrls

      localStorage.setItem('lastPlace', JSON.stringify({
        placeId: id,
        placeName: name
      }))

      this.getWeatherDataFromApi(name)
    },

    getPlaceDataFromApi() {
      getPlaceData(
          this.service,
          this.defaultPlace.placeId,
          this.defaultPlace.placeName,
          this.updateData
      )
    },

    getWeatherDataFromApi(name) {
      const formattedName = name.split(",")[0]
      getWeatherData(formattedName)
          .then(response => {
            if (!response) {
              this.showError()
              localStorage.removeItem('lastPlace')
              this.getPlaceDataFromApi()
            } else {
              this.weather = this.reformatWeatherData(response)
              this.loading = false
            }
          })
    },

    showError() {
      this.isError = true
      setTimeout(() => {
        this.isError = false
      }, 3500)
    }
  }
}
</script>

<style scoped lang="sass">
.weather
  display: flex
  position: relative
  box-shadow: -4px 4px 4px 0px rgb(0 0 0 / 50%)

.photo
  position: relative
  height: 434px
  width: 600px

.search
  position: absolute
  left: 50%
  top: 40px
  transform: translateX(-50%)
  z-index: 100

.error
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>
