<template>
  <div class="weather-block">
    <div class="weather-block__top">
      <div class="weather-block__top_left">
        <img v-if="iconURL" :src="iconURL" class="weather-block__icon" />
      </div>
      <div class="weather-block__top_right">
        <div class="weather-block__date">{{ weather.date }}</div>
        <div class="weather-block__city">{{ weather.city }}</div>
      </div>
    </div>
    <div class="weather-block__middle">
      <span class="weather-block__temperature">{{ weather.temperature }}</span>
      <span class="weather-block__celsius">°C</span>
    </div>
    <div class="weather-block__bottom">
      <div class="weather-block__description">
        <span>{{ weather.description }}</span>
      </div>
      <div class="weather-block__feels-like">
        <span>feels like: </span><span>{{ weather.feels_like }}°C</span>
      </div>
      <div class="weather-block__pressure">
        <span>pressure: </span><span>{{ weather.pressure }} mm</span>
      </div>
      <div class="weather-block__humidity">
        <span>humidity: </span><span>{{ weather.humidity }} %</span>
      </div>
      <div class="weather-block__wind-speed">
        <span>wind: </span><span>{{ weather.wind_speed }} m/sec</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WeatherBlock',
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    iconURL() {
      return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
    }
  }
}
</script>

<style scoped lang="sass">
.weather-block
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  box-sizing: border-box
  padding: 40px
  background: #323544
  font-family: 'Roboto', sans-serif
  color: #bfc1c8
  &__icon
    width: 80px
    height: 80px
    position: relative
    top: -20px
    left: -20px
  &__date
    text-align: right
    letter-spacing: 2px
    margin-bottom: 5px
  &__city
    text-transform: uppercase
    text-align: right
    letter-spacing: 2px
  &__temperature
    font-size: 124px
    font-weight: bold
    font-family: 'Unbounded', cursive
    color: white
  &__celsius
    font-size: 64px
    font-family: 'Unbounded', cursive
    color: white
  &__description
    text-align: right
    letter-spacing: 2px
  &__top
    display: flex
    justify-content: space-between
    &_left
      position: relative
      height: 50px
  &__bottom
    text-transform: uppercase
    letter-spacing: 2px
    & > div
      display: flex
      justify-content: space-between
      margin-bottom: 10px
</style>
