import { ref, onMounted, onUnmounted } from 'vue';

export function useIsMobile() {
  const isMobile = ref(true);

  const checkIsMobile = () => window.innerWidth < 1024;

  const handleResize = () => {
    isMobile.value = checkIsMobile();
  };

  onMounted(() => {
    isMobile.value = checkIsMobile();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return {
    isMobile
  }
}