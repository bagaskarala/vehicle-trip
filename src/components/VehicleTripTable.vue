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
      class="mb-0"
      responsive
      :items="tripDataProcessed"
      :fields="fields"
    >
      <template v-slot:cell(location)="data">
        <div style="min-width:300px">

          <span class="font-weight-bold">From: </span>
          <a
            :href="getPublicNominatim(data.item.location.start.place_id)"
            target="_blank"
          >{{data.item.location.start.display_name}}</a>
          <hr>
          <span class="font-weight-bold">To: </span>
          <a
            :href="getPublicNominatim(data.item.location.end.place_id)"
            target="_blank"
          >{{data.item.location.end.display_name}}</a>
        </div>
      </template>
      <template v-slot:cell(histories)="data">
        <button
          class="btn btn-sm btn-primary mx-1 my-1"
          @click="loadTripHistory(data.item.histories)"
        >Show Detail</button>
        <button class="btn btn-sm btn-dark mx-1 my-1">
          <download-csv
            :data="formatToExport(data.item.histories)"
            :name="generateFileName(data.item)"
          >
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
      tripDataProcessed: [],
      fields: [
        {
          key: 'startDateTime',
          label: 'Start Datetime'
        },
        {
          key: 'endDateTime',
          label: 'End Datetime'
        },
        {
          key: 'location',
          label: 'Location'
        },
        {
          key: 'histories',
          label: 'History'
        }

      ]
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
          datetime: formatTimezone(tracked_at, 'yyyy-MM-dd hh:mm:ss'),
          latitude,
          longitude,
          speed: knotToKmh(speed).toFixed(0),
          distance
        };
      });
    },

    async processTripData() {
      const promises = this.tripData.map(async item => {
        const startLocation = await this.getReverseGeocoding(item.start.latitude, item.start.longitude);
        const endLocation = await this.getReverseGeocoding(item.end.latitude, item.end.longitude);
        return {
          id: item.id,
          startDateTime: formatTimezone(item.start.tracked_at),
          endDateTime: formatTimezone(item.end.tracked_at),
          location: {
            start: startLocation.data,
            end: endLocation.data
          },
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
    },

    generateFileName(item) {
      return `Trip#${item.id}.csv`;
    }
  },

  created() {
    this.processTripData();
  }
};
</script>

<style>
</style>