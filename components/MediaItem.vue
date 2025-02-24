<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  media: {
    type: Object,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
});
</script>

<template>
    <img
      v-if="media.type === 'image'"
      :src="media.src"
      :class="class"
      />
    <video
      v-else
      autoplay
      loop
      muted
      playsinline
      :src="media.src"
      :class="class"
    ></video>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/media.scss';
</style>
