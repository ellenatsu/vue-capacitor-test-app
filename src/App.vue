<template>
<div>
  <h1>Geolocation</h1>
  <p>Your location is:</p>
  <p>Latitude: {{ loc.lat }}</p>
  <p>Longitude: {{ loc.long }}</p>

  <button @click="getCurrentPosition">
    Get Current Location
  </button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
export default defineComponent({
  setup() {
    const loc = ref<{
      lat: null | number;
      long: null | number;
    }>({
      lat: null,
      long: null,
    });

    const ensurePermissions = async () => {
      const permResult = await Geolocation.checkPermissions();

      if (permResult.location === 'denied' || permResult.location === 'prompt') {
        await Geolocation.requestPermissions();
      }
    };

    const getCurrentPosition = async () => {
        try {
        await ensurePermissions();

          const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 20000,      // 20s timeout
      maximumAge: 0,
    });

        loc.value = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        };
      } catch (e) {
        console.error('Error getting location', e);
      }
    };
    return { getCurrentPosition, loc };
  },
});
</script>