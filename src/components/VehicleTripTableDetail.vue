<template>
  <b-modal
    id="modal-trip-history"
    title="BootstrapVue"
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
    </b-table>
  </b-modal>
</template>

<script>
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
          key: 'speed'
        }
      ]
    };
  }
};
</script>