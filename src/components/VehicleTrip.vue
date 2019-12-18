<template>
  <div class="row">
    <div class="col">
      <h1 class="mt-3">Vehicle Trip</h1>
      <small class="text-muted">by: Bagaskara Luthfi</small>
      <hr>
      <div class="d-flex justify-content-end">
        <div class="mr-5">
          <p class="mb-0 text-right">Total Distance</p>
          <h2 class="text-success  text-right">{{totalDistance}}</h2>
        </div>
        <div>
          <p class="mb-0 text-right">Total Trips</p>
          <h2 class="text-success  text-right">{{totalTrips}}</h2>
        </div>
      </div>

      <VehicleTripStats
        :trip-data="VechicleTripData.trips"
        :summary="VechicleTripData.summary"
        @count-total-distance="totalDistance = $event"
        @count-total-trips="totalTrips = $event"
      />

      <VehicleTripTable :trip-data="VechicleTripData.trips" />
    </div>
  </div>
</template>

<script>
import VechicleTripData from '../../json/vehicle-trip-20190223.json';
import VehicleTripTable from './VehicleTripTable.vue';
import VehicleTripStats from './VehicleTripStats.vue';
export default {
  name: 'VechicleTrip',
  components: { VehicleTripTable, VehicleTripStats },
  data() {
    return {
      VechicleTripData,
      totalDistance: 0,
      totalTrips: 0
    };
  }
};
</script>