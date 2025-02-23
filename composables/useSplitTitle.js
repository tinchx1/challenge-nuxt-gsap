import { computed } from "vue";

export function useSplitTitle(currentTitle, nextTitle) {
  const splitTitle = computed(() => currentTitle.value.split("").map(letter => letter === " " ? `<span class="letter">&nbsp;</span>` : `<span class="letter">${letter}</span>`).join(""));
  const splitNextTitle = computed(() => nextTitle.value.split("").map(letter => letter === " " ? `<span class="letter">&nbsp;</span>` : `<span class="letter">${letter}</span>`).join(""));

  return { splitTitle, splitNextTitle };
}