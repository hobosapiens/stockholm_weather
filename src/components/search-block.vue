<template>
  <div class="search-block">
    <input
        ref="search"
        v-model="input"
        class="search-block__input"
        type="text"
        placeholder="Type country or city"
    />
    <div v-if="isError" class="search-block__error">
      <span>Unfortunately, there is no information about this locality 😬</span><br/><br/>
      <span>Make sure you choose location from the list 👌</span>
    </div>
  </div>
</template>

<script>
import {getPlaceData} from "../api.js";

export default {
  name: 'SearchBlock',
  props: {
    service: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      input: '',
      isError: false
    }
  },
  mounted() {
    const autocomplete = new google.maps.places.Autocomplete(
        this.$refs['search'],
        {
          fields: ['name', 'place_id']
        }
    )

    autocomplete.addListener('place_changed', () => {
          const {name, place_id} = autocomplete.getPlace()
          this.input = ''

          if (!place_id) {
            this.$emit('error')
            return
          }

          getPlaceData(this.service, place_id, name, this.updatePlaceData)
        }
    )
  },
  methods: {
    updatePlaceData(placeData) {
      this.$emit('update', placeData)
    }
  }
}
</script>

<style scoped lang="sass">
.search-block
  position: relative

  &__input
    width: 240px
    border: none
    outline: none
    padding: 12px 16px
    box-shadow: -3px 3px 4px -2px rgb(0 0 0 / 50%) inset
    font-family: 'Roboto', sans-serif
    color: #323544
    letter-spacing: 2px

    &:focus
      border: none !important

  &__error
    position: absolute
    bottom: -20px
    transform: translateY(100%)
    background: white
    padding: 20px
    font-family: 'Unbounded', cursive
    color: red
    box-shadow: -4px 4px 4px 0px rgb(0 0 0 / 50%)

    &:after
      bottom: 100%
      left: 50%
      content: " "
      height: 0
      width: 0
      position: absolute
      pointer-events: none
      margin-left: -15px
      border: solid rgba(136, 183, 213, 0)
      border-bottom-color: white
      border-width: 15px
</style>
