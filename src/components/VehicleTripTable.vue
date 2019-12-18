<template>
  <div class="card shadow-sm">
    <div class="card-header">
      Vehicle Trip Data
    </div>
    <!-- <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
    </div> -->
    <b-table
      striped
      hover
      :items="tripData"
      :fields="fields"
    >
      <template v-slot:cell(location)="data">
        <p class="text-info">Long: {{ data.item.end.longitude }}</p>
        <p class="text-info">Lat: {{ data.item.end.latitude }}</p>
      </template>
      <template v-slot:cell(history)="data">
        <button
          class="btn btn-sm btn-primary mx-1 my-1"
          @click="loadTripHistory(data.item.histories)"
        >Show Detail</button>
        <button class="btn btn-sm btn-dark mx-1 my-1">
          <download-csv :data="formatToExport(data.item.histories)">
            Export CSV
          </download-csv>
        </button>
      </template>
    </b-table>

    <!-- modal trip history -->
    <VehicleTripTableDetail :trip-history="tripHistory" />
  </div>
</template>

<script>
import { knotToKmh } from '../shared/utils';
import VehicleTripTableDetail from './VehicleTripTableDetail';
export default {
  name: 'VehicleTripTable',
  components: { VehicleTripTableDetail },
  props: {
    tripData: Array
  },
  data() {
    return {
      fields: [
        {
          key: 'start.tracked_at',
          label: 'Start Time'
        },
        {
          key: 'end.tracked_at',
          label: 'End Time'
        },
        {
          key: 'location',
          label: 'End Location'
        },
        {
          key: 'history'
        }
      ],
      tripHistory: []
    };
  },
  methods: {
    loadTripHistory(histories) {
      this.$bvModal.show('modal-trip-history');
      this.tripHistory = histories;
    },
    exportHistory(histories) {
      console.log(histories);
    },
    formatToExport(histories) {
      return histories.map(item => {
        const { id, tracked_at, latitude, longitude, speed, distance } = item;
        return {
          id,
          datetime: tracked_at,
          latitude,
          longitude,
          speed: knotToKmh(speed),
          distance
        };
      });
    }
  }
};
</script>

<style>
</style>