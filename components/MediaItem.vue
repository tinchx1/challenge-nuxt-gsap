<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  media: {
    type: Object,
    required: true,
  },
  customClass: {
    type: String,
    default: '',
  },
  height_media: {
    type: String,
    default: 'auto',
  },
  width_media: {
    type: String,
    default: 'auto',
  },
});
</script>

<template>
    <img
      v-if="media.type === 'image'"
      :src="media.src"
      :class="customClass"
      />
    <video
      v-else
      autoplay
      loop
      muted
      :height="height_media"
      :width="width_media"
      playsinline
      :src="media.src"
      :class="customClass"
    ></video>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/media.scss';
</style>
