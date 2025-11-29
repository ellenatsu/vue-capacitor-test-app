<template>
  <div style="padding: 16px">
    <!-- Device info -->
    <section style="margin-bottom: 24px">
      <h2>Device</h2>
      <button @click="getDeviceInfo">Get Device Info</button>

      <pre v-if="deviceInfo" style="margin-top: 12px; white-space: pre-wrap"
        >{{ deviceInfo }}
      </pre>
    </section>

    <!-- Clipboard -->
    <section style="margin-bottom: 24px">
      <h2>Clipboard</h2>

      <div style="margin-bottom: 8px">
        <label>
          Text to copy:
          <input v-model="clipboardText" type="text" style="margin-left: 8px" />
        </label>
      </div>

      <button @click="copyToClipboard">Copy to Clipboard</button>

      <p v-if="clipboardStatus" style="margin-top: 8px">
        {{ clipboardStatus }}
      </p>
    </section>

    <!-- Filesystem -->
    <section>
      <h2>Filesystem (read file)</h2>

      <p style="font-size: 13px">
        Note: this reads from a path inside the app's sandbox (e.g. Documents).
        You need to make sure this file exists first (write it in code or via
        other logic).
      </p>

      <div style="margin-bottom: 8px">
        <label>
          File path:
          <input
            v-model="filePath"
            type="text"
            style="margin-left: 8px; width: 200px"
          />
        </label>
      </div>

      <button @click="readTextFile" style="margin-right: 8px">
        Read as text
      </button>
      <button @click="readImageFile">Read as image</button>

      <!-- Text file content -->
      <div v-if="fileContent" style="margin-top: 12px">
        <h3>Text file content:</h3>
        <pre style="white-space: pre-wrap">{{ fileContent }}</pre>
      </div>

      <!-- Image file content -->
      <div v-if="imageDataUrl" style="margin-top: 12px">
        <h3>Image preview:</h3>
        <img :src="imageDataUrl" alt="Loaded image" style="max-width: 100%" />
      </div>

      <p v-if="fsError" style="color: red; margin-top: 8px">
        {{ fsError }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Device } from "@capacitor/device";
import { Clipboard } from "@capacitor/clipboard";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

/**
 * DEVICE
 */
const deviceInfo = ref<string | null>(null);

const getDeviceInfo = async () => {
  try {
    const info = await Device.getInfo();
    // pretty-print JSON so you can see everything
    deviceInfo.value = JSON.stringify(info, null, 2);
  } catch (err) {
    console.error("Device error", err);
    deviceInfo.value = "Error getting device info. See console.";
  }
};

/**
 * CLIPBOARD
 */
const clipboardText = ref("Hello from Capacitor clipboard!");
const clipboardStatus = ref<string | null>(null);

const copyToClipboard = async () => {
  try {
    await Clipboard.write({
      string: clipboardText.value,
    });
    clipboardStatus.value = "Copied to clipboard!";
  } catch (err) {
    console.error("Clipboard error", err);
    clipboardStatus.value = "Error copying to clipboard. See console.";
  }
};

/**
 * FILESYSTEM
 */
const filePath = ref("test.txt"); // path relative to Directory.Documents (you can change it)
const fileContent = ref<string | null>(null);
const imageDataUrl = ref<string | null>(null);
const fsError = ref<string | null>(null);

// Read as TEXT (UTF-8)
const readTextFile = async () => {
  fsError.value = null;
  fileContent.value = null;

  try {
    const result = await Filesystem.readFile({
      path: filePath.value,
      directory: Directory.Documents,
      encoding: Encoding.UTF8, // you already fixed this part
    });

    if (typeof result.data === "string") {
      // TS now knows this is string, not Blob
      fileContent.value = result.data;
    } else {
      // This should never happen when using Encoding.UTF8,
      // but we handle it just to satisfy TS and be safe.
      fsError.value = "Unexpected binary data instead of text.";
      console.warn(
        "readFile returned Blob when UTF8 encoding was requested",
        result.data
      );
    }
  } catch (err) {
    console.error("Filesystem text read error", err);
    fsError.value = "Failed to read text file.";
  }
};

// Read as IMAGE (base64 → data URL)
const readImageFile = async () => {
  fsError.value = null;
  imageDataUrl.value = null;
  fileContent.value = null;

  try {
    const result = await Filesystem.readFile({
      path: filePath.value,
      directory: Directory.Documents,
      // no encoding → data is base64
    });

    // Build a data URL. If you know the exact mime type, replace image/*.
    imageDataUrl.value = `data:image/*;base64,${result.data}`;
  } catch (err: any) {
    console.error("Filesystem image read error", err);
    fsError.value =
      "Failed to read image file. Make sure it exists in Documents.";
  }
};
</script>
