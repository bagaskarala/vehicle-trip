<template>
  <div
    id="app"
    class="container py-3"
  >
    <VehicleTrip />
  </div>
</template>

<script>
import VehicleTrip from './components/VehicleTrip.vue';

export default {
  name: 'app',
  components: {
    VehicleTrip
  }
};
</script>