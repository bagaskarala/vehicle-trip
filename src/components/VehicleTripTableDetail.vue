<template>
  <b-modal
    id="modal-trip-history"
    title="Trip History"
    body-class="p-0"
    scrollable
    centered
    ok-only
    lazy
    size="lg"
  >
    <b-table
      striped
      class="mb-0"
      :items="tripHistory"
      :fields="fields"
    >
      <template v-slot:cell(datetime)="data">
        <span>{{formatTimezone(data.item.tracked_at, 'yyyy-mm-dd hh:mm:ss')}}</span>
      </template>
      <template v-slot:cell(coordinate)="data">
        <p class="text-info mb-0">Lat: {{ data.item.latitude }}</p>
        <p class="text-info mb-0">Long: {{ data.item.longitude }}</p>
      </template>
      <template v-slot:cell(speed)="data">
        <span>{{knotToKmh(data.item.speed).toFixed(0)}}</span>
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
          key: 'datetime',
        },
        {
          key: 'coordinate'
        },
        {
          key: 'speed',
          label: 'Speed (km/h)'
        },
        {
          key: 'distance',
          label: 'Distance (m)'
        }
      ]
    };
  },
  methods: {
    knotToKmh, formatTimezone
  }
};
</script>