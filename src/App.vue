<template>
  <div
    id="app"
    class="container"
  >
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <VehicleTrip />
  </div>
</template>

<script>
import VehicleTrip from './components/VehicleTrip.vue'

export default {
  name: 'app',
  components: {
    VehicleTrip
  }
}
</script>