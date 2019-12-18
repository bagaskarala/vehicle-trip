<template>
  <div class="row">
    <div class="col">
      <h1>Vehicle Trip</h1>
      <a
        href="#"
        class="btn btn-danger"
      >asdaf</a>
      <VehicleTripStats />
      <VehicleTripTable :trip-data="VechicleTripData.trips" />
    </div>
  </div>
</template>

<script>
import VechicleTripData from '../../json/vehicle-trip-20190223.json'
import VehicleTripTable from './VehicleTripTable.vue'
import VehicleTripStats from './VehicleTripStats.vue'
export default {
  name: 'VechicleTrip',
  components: { VehicleTripTable, VehicleTripStats },
  data() {
    return {
      VechicleTripData
    }
  },

}
</script>