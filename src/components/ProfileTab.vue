<template>
  <div>
    <h1>we test capacitor plugins: Geolocation</h1>

    <button @click="getCurrentPosition">Get Current Location</button>

    <p>Your location is:</p>
    <p>Latitude: {{ loc.lat }}</p>
    <p>Longitude: {{ loc.long }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Geolocation } from "@capacitor/geolocation";

const loc = ref<{ lat: number | null; long: number | null }>({
  lat: null,
  long: null,
});

const ensurePermissions = async () => {
  const permResult = await Geolocation.checkPermissions();

  if (permResult.location === "denied" || permResult.location === "prompt") {
    await Geolocation.requestPermissions();
  }
};

const getCurrentPosition = async () => {
  try {
    await ensurePermissions();

    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    });

    loc.value = {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    };
  } catch (e) {
    console.error("Error getting location", e);
  }
};
</script>
