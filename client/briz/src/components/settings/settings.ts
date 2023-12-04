import { ref } from 'vue';

const themeRef = ref('darkTheme');
export function useSettings() {
  function saveSettings() {}

  return {
    saveSettings,
    themeRef,
  };
}
