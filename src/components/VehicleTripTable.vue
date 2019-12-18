<template>
  <div class="card shadow-sm">
    <div class="card-header">
      Vehicle Trip Data
    </div>
    <h4
      v-if="isBusy"
      class="text-center text-primary my-5"
    >Loading...</h4>
    <b-table
      v-else
      striped
      hover
      :items="tripDataProcessed"
    >
      <template v-slot:cell(location)="data">
        <a :href="getPublicNominatim(data.item.location.place_id)">{{data.item.location.display_name}}</a>
      </template>
      <template v-slot:cell(histories)="data">
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
import OSMService from '../services/OSMService';
import { knotToKmh, formatTimezone } from '../shared/utils';
import VehicleTripTableDetail from './VehicleTripTableDetail';
export default {
  name: 'VehicleTripTable',
  components: { VehicleTripTableDetail },
  props: {
    tripData: Array
  },

  data() {
    return {
      isBusy: false,
      tripHistory: [],
      tripDataProcessed: []
    };
  },

  methods: {
    loadTripHistory(histories) {
      this.$bvModal.show('modal-trip-history');
      this.tripHistory = histories;
    },

    formatToExport(histories) {
      return histories.map(item => {
        const { id, tracked_at, latitude, longitude, speed, distance } = item;
        return {
          id,
          datetime: formatTimezone(tracked_at, 'yyyy-mm-dd hh:mm:ss'),
          latitude,
          longitude,
          speed: knotToKmh(speed).toFixed(0),
          distance
        };
      });
    },

    async processTripData() {
      const promises = this.tripData.map(async item => {
        const location = await this.getReverseGeocoding(item.end.latitude, item.end.longitude);
        return {
          startTime: formatTimezone(item.start.tracked_at),
          endTime: formatTimezone(item.end.tracked_at),
          location: location.data,
          histories: item.histories
        };
      });
      this.tripDataProcessed = await Promise.all(promises);
    },

    async getReverseGeocoding(lat, long) {
      this.isBusy = true;
      try {
        const response = await OSMService.getReverseGeocoding(lat, long);
        this.isBusy = false;
        return response;
      } catch (error) {
        console.log(error);
        this.isBusy = false;
        return null;
      }
    },

    getPublicNominatim(placeId) {
      return OSMService.getPublicNominatim(placeId);
    }
  },

  created() {
    this.processTripData();
  }
};
</script>

<style>
</style>