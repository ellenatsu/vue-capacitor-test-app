<template>
  <p>we test capacitor plugins: camera</p>
  <button @click="takePicture">Take picture</button>

  <!-- Show the image after taking a picture -->
  <div v-if="imageSrc" style="margin-top: 16px">
    <img :src="imageSrc" alt="Camera result" style="max-width: 100%" />
  </div>
</template>

<script setup lang="ts">
import { Camera, CameraResultType } from "@capacitor/camera";
import { ref } from "vue";

const imageSrc = ref<string | null>(null);

const takePicture = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath can be used directly as <img :src="">
    imageSrc.value = image.webPath ?? null;
  } catch (err) {
    console.error("Camera error", err);
  }
};
</script>
