<template>
  <div class="weather-block">
    <div class="weather-block__left">
      <div class="weather-block__top">
        <div class="weather-block__top_left">
          <img
              v-if="iconURL"
              :src="iconURL"
              class="weather-block__icon"
              alt="weather-icon"
          />
        </div>
        <div class="weather-block__top_right">
          <span class="weather-block__description">{{ weather.description }}</span>
        </div>
      </div>
      <div class="weather-block__middle">
        <span class="weather-block__temperature">{{ weather.temperature }}</span>
        <span class="weather-block__celsius">°C</span>
      </div>
      <div class="weather-block__bottom">
        <div class="weather-block__city">{{ city }}</div>
        <div class="weather-block__date">Local time:  {{ weather.localTime }}</div>
      </div>
    </div>
    <div class="weather-block__right">
      <div class="weather-block__right_item weather-block__feels-like">
        <span class="weather-block__right_item_amount">
          {{ weather.feels_like }}<span class="value">°C</span>
        </span>
        <span class="weather-block__right_item_title">feels like</span>
      </div>
      <div class="weather-block__right_item weather-block__pressure">
        <span class="weather-block__right_item_amount">
          {{ weather.pressure }}<span class="value">mm</span>
        </span>
        <span class="weather-block__right_item_title">pressure</span>
      </div>
      <div class="weather-block__right_item weather-block__humidity">
        <span class="weather-block__right_item_amount">
          {{ weather.humidity }}<span class="value">%</span>
        </span>
        <span class="weather-block__right_item_title">humidity</span>
      </div>
      <div class="weather-block__right_item weather-block__wind-speed">
        <span class="weather-block__right_item_amount">
          {{ weather.wind_speed }}<span class="value">m/sec</span>
        </span>
        <span class="weather-block__right_item_title">wind</span>
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
    },
    city: {
      type: String,
      required: true
    }
  },
  computed: {
    isDayTime() {
      const hours = new Date().getHours()
      return hours > 6 && hours < 20
    },
    iconURL() {
      return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
    }
  }
}
</script>

<style scoped lang="sass">
.weather-block
  display: flex
  flex-wrap: nowrap
  box-sizing: border-box
  color: white
  text-transform: uppercase
  font-size: 16px
  font-family: 'Oxygen', sans-serif
  padding: 40px

  &__left
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 100%

  &__right
    display: flex
    align-items: flex-end
    justify-content: flex-end
    flex-grow: 1

    &_item
      display: flex
      flex-direction: column
      white-space: nowrap

      &:not(:first-of-type)
        margin-left: 65px

      &_amount
        font-size: 20px
        font-weight: bold
        font-family: 'Unbounded', cursive

        .value
          font-size: 12px

      &_title
        font-size: 12px

  &__top
    display: flex

    &_left
      position: relative
      height: 50px

  &__icon
    position: relative
    left: -10px
    top: -30px

  &__city
    margin-bottom: 10px

  &__temperature
    font-size: 124px
    font-weight: bold
    font-family: 'Unbounded', cursive
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5)

  &__celsius
    font-size: 80px
    font-weight: bold
    font-family: 'Unbounded', cursive
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5)

  &__description
    display: block
    margin-top: 9px
    margin-left: 5px
</style>
