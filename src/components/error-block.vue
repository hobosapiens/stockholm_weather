<template>
  <div class="error-block">
    <div class="error-block__gif-wrapper">
      <img src="../assets/error.gif" alt="loader" class="error-block__gif">
    </div>
    <div class="error-block__text">
      <span>No weather data for this locality 😬</span><br/><br/>
      <span>Make sure you choose location from the list 👌</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorBlock'
}
</script>

<style scoped lang="sass">
.error-block
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  padding: 20px
  background: white
  box-shadow: -4px 4px 4px 0px rgb(0 0 0 / 50%)

  &__gif
    width: 350px
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)

    &-wrapper
      position: relative
      height: 90px
      width: 100%
      overflow: hidden
      margin-bottom: 20px

  &__text
    color: red
    font-family: 'Roboto', sans-serif
    letter-spacing: 2px
    text-align: center
</style>
