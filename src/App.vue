<template>
  <div v-if="loaded" class="city-background">
    <weather-block :weather="weather" />
    <div class="city-image"><img src="./assets/city.jpg" alt="city"></div>
  </div>
  <div v-else class="loader">
    <img src="./assets/loader.gif" alt="loader" class="loader-image">
    <div class="loader-text">Loading...</div>
  </div>
</template>

<script>
import WeatherBlock from './components/weather-block.vue'
import { getWeatherData } from "./api.js";

export default {
  components: {
    WeatherBlock
  },
  data() {
    return {
      weather: {},
      loaded: false
    }
  },
  beforeMount() {
    getWeatherData('Stockholm')
        .then(response => {
          this.weather = this.reformatWeatherData(response)
          this.loaded = true
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
        icon: data?.weather[0]?.icon,
      }
    }
  }
}
</script>

<style scoped lang="sass">
.city-background
  display: flex
  box-shadow: 0 0 8px rgb(0 0 0 / 50%)
  border-radius: 50px
  overflow: hidden
.city-image
  height: 434px
  img
    max-height: 100%
</style>
