<template>
  <div class="weather-block">
    <div class="weather-block__left">
      <div class="weather-block__top">
        <div class="weather-block__top_left">
          <img
              :src="require(`../assets/weather-icons/${ weather.icon }.png`)"
              class="weather-block__icon"
              :alt="weather.description"
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
  }
}
</script>

<style scoped lang="sass">
.weather-block
  display: flex
  flex-wrap: nowrap
  box-sizing: border-box
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 1
  color: white
  text-transform: uppercase
  font-size: 16px
  font-family: 'Oxygen', sans-serif
  padding: 40px

  @media screen and (max-width: 960px)
    padding: 20px

  @media screen and (max-width: 720px)
    justify-content: space-between
    font-size: 14px

  @media screen and (max-width: 540px)
    text-align: center
    padding: 24px

  &__left
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 100%

    @media screen and (max-width: 540px)
      align-items: center
      width: 100%

  &__right
    display: flex
    align-items: flex-end
    justify-content: flex-end
    flex-grow: 1

    @media screen and (max-width: 720px)
      align-self: flex-end
      justify-content: space-between
      flex-wrap: wrap
      flex-grow: 0
      width: 160px
      gap: 6px

    @media screen and (max-width: 540px)
      position: absolute
      left: 0
      right: 0
      bottom: -164px
      background: -webkit-linear-gradient(180deg, #BDD6ED 0, #768FC1 100%)
      box-shadow: -4px 4px 4px 0px rgb(0 0 0 / 50%)
      border-radius: 16px
      padding: 20px
      width: 100%
      box-sizing: border-box
      gap: 10px

    &_item
      display: flex
      flex-direction: column
      white-space: nowrap

      @media screen and (max-width: 720px)
        width: calc(50% - 5px)

      @media screen and (max-width: 540px)
        width: calc(50% - 10px)
        align-items: center

      &:not(:first-of-type)
        margin-left: 65px

        @media screen and (max-width: 960px)
          margin-left: 40px

        @media screen and (max-width: 720px)
          margin-left: 0

      &_amount
        font-size: 20px
        font-weight: bold
        font-family: 'Unbounded', cursive

        .value
          font-size: 12px

      &_title
        font-size: 12px

      @media screen and (max-width: 540px)
        margin-top: 8px

  &__top
    display: flex

    &_left
      position: relative
      height: 50px

  &__icon
    position: relative
    margin-right: 25px

    @media screen and (max-width: 960px)
      width: 30px

  &__city
    margin-bottom: 10px

  &__temperature
    font-size: 124px
    font-weight: bold
    font-family: 'Unbounded', cursive
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5)

    @media screen and (max-width: 720px)
      font-size: 64px

  &__celsius
    font-size: 80px
    font-weight: bold
    font-family: 'Unbounded', cursive
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5)

    @media screen and (max-width: 720px)
      font-size: 44px

  &__description
    display: block
    margin-top: 9px
    margin-left: 5px

    @media screen and (max-width: 960px)
      margin-top: 4px
      margin-left: 0

    @media screen and (max-width: 540px)
      margin-top: 6px
</style>
