<template>
  <b-modal
    id="modal-trip-history"
    title="Trip History"
    no-body
  >
    <b-table
      striped
      :items="tripHistory"
      :fields="fields"
    >
      <template v-slot:cell(location)="data">
        <p class="text-info">Long: {{ data.item.longitude }}</p>
        <p class="text-info">Lat: {{ data.item.latitude }}</p>
      </template>
      <template v-slot:cell(speed)="data">
        <span>{{knotToKmh(data.item.speed)}}</span>
      </template>
    </b-table>
  </b-modal>
</template>

<script>
import { knotToKmh } from '../shared/utils';
export default {
  name: 'VehicleTripTableDetail',
  props: {
    tripHistory: Array
  },
  data() {
    return {
      fields: [
        {
          key: 'tracked_at',
          label: 'Time'
        },
        {
          key: 'location'
        },
        {
          key: 'speed',
          label: 'Speed (km/h)'
        }
      ]
    };
  },
  methods: {
    knotToKmh
  }
};
</script>