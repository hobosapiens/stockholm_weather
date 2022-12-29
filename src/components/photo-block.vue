<template>
  <div class="photo-block">
    <div class="photo-block__wrapper">
      <img
          :src="currentPhotoUrl"
          :alt="city"
          :class="{'blurred': isError}"
          class="photo-block__img"
      />
      <div class="photo-block__vignette" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PhotosBlock',
  props: {
    photos: {
      type: Array,
      require: true
    },
    city: {
      type: String,
      default: 'City'
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPhoto: 0
    }
  },
  mounted() {
    this.showPhoto()
  },
  computed: {
    currentPhotoUrl() {
      return this.photos[this.currentPhoto]
    }
  },
  methods: {
    showPhoto() {
      this.currentPhoto = (this.currentPhoto + 1) % this.photos.length

      if ((this.currentPhoto + 1) > this.photos.length) this.currentPhoto = 0

      setTimeout(this.showPhoto, 4500)
    }
  }
}
</script>

<style scoped lang="sass">
.photo-block
  display: flex
  justify-content: center
  flex-direction: column
  position: relative
  width: 100%
  height: 100%
  overflow: hidden

  &__wrapper
    display: flex
    align-items: center
    justify-content: center
    height: 100%

    &:after
      content: ''
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      display: inline-block
      opacity: .5
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgb(255 173 158 / 50%)), color-stop(100%, rgb(115 203 255 / 50%)))

  &__img
    width: 100%
    height: 100%
    object-fit: cover
    position: relative

    &.blurred
      filter: grayscale(0.5) sepia(0.5) blur(5px)

  &__vignette
    display: block
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0

    &:before, &:after
      content: ''
      position: absolute
      left: 0
      width: 100%
      height: 100px
      filter: blur(2px)

    &:before
      top: 0
      background: linear-gradient(180deg, rgb(0 0 0 / 60%) 0%, rgba(42, 13, 61, 0) 100%)

    &:after
      bottom: 0
      background: linear-gradient(0deg, rgb(0 0 0 / 60%) 0%, rgba(42, 13, 61, 0) 100%)
</style>
