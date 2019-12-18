<template>
  <div></div>
</template>

<script>
export default {
  name: 'VehiceTripStats',
  props: {
    tripData: Array,
    summary: {
      type: Object,
      default: function () {
        return { summary: 0 };
      }
    }
  },

  computed: {
    // convert distance to km
    totalDistance() {
      return this.summary.distance / 1000 + ' km';
    },
    // count trips
    totalTrips() {
      return this.tripData.length;
    }
  },

  watch: {
    totalDistance: {
      handler: function () {
        this.$emit('count-total-distance', this.totalDistance);
      },
      immediate: true
    },
    totalTrips: {
      handler: function () {
        this.$emit('count-total-trips', this.totalTrips);
      },
      immediate: true
    }
  }
};
</script>