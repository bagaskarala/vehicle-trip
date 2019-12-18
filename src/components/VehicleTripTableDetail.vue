<template>
  <b-modal
    id="modal-trip-history"
    title="Trip History"
    body-class="p-0"
    scrollable
    size="lg"
    centered
    ok-only
    lazy
  >
    <b-table
      striped
      class="mb-0"
      :items="tripHistory"
      :fields="fields"
    >
      <template v-slot:cell(datetime)="data">
        <span>{{formatTimezone(data.item.tracked_at, 'yyyy-MM-dd hh:mm:ss')}}</span>
      </template>
      <template v-slot:cell(coordinate)="data">
        <p class="text-info mb-0">Lat: {{ data.item.latitude }}</p>
        <p class="text-info mb-0">Long: {{ data.item.longitude }}</p>
      </template>
      <template v-slot:cell(speed)="data">
        <span>{{knotToKmh(data.item.speed).toFixed(0)}} km/h</span>
      </template>
      <template v-slot:cell(distance)="data">
        <span>{{data.item.distance}} m</span>
      </template>
    </b-table>
  </b-modal>
</template>

<script>
import { knotToKmh, formatTimezone } from '../shared/utils';
export default {
  name: 'VehicleTripTableDetail',
  props: {
    tripHistory: Array
  },
  data() {
    return {
      fields: [
        {
          key: 'datetime'
        },
        {
          key: 'coordinate'
        },
        {
          key: 'speed'
        },
        {
          key: 'distance'
        }
      ]
    };
  },
  methods: {
    knotToKmh, formatTimezone
  }
};
</script>