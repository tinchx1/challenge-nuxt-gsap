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
      playsinline
      :src="media.src"
      :class="customClass"
    ></video>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/media.scss';
</style>
