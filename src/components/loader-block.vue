<template>
  <div class="loader-block">
    <img src="../assets/loader.gif" alt="loader" class="loader-block__gif">
    <div class="loader-block__text">LOADING</div>
  </div>
</template>

<script>
export default {
  name: 'LoaderBlock'
}
</script>

<style scoped lang="sass">
.loader-block
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)

  &__text
    position: relative
    left: 2px
    font-family: 'Oxygen', sans-serif
    letter-spacing: 2px
    margin-top: 20px
    font-size: 16px

    @media screen and (max-width: 720px)
      font-size: 14px
</style>
