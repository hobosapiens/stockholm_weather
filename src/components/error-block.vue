<template>
  <div class="error-block" @click="$emit('close')">
    <div class="error-block__wrapper">
      <div class="error-block__gif-wrapper">
        <img src="../assets/error.gif" alt="loader" class="error-block__gif">
      </div>
      <div class="error-block__text">
        <span>No weather data for this locality</span><br/><br/>
        <span>Make sure you choose location from the list</span>
      </div>
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

  &::after
    content: url('../assets/close.svg')
    display: block
    width: 20px
    height: 20px
    position: absolute
    top: 40px
    right: 40px
    cursor: pointer

    &:hover
      opacity: .7

  &__wrapper
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    padding: 40px
    border-radius: 20px
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
    font-size: 11px
    font-weight: bold
    font-family: 'Unbounded', cursive
    text-transform: uppercase
    text-align: center
    color: black
</style>
