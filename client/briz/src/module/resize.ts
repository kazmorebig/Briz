import type { Breakpoints } from 'naive-ui/es/config-provider/src/internal-interface';
import { ref } from 'vue';

const smallResolution = ref<boolean>(false);
const breakpoints: Breakpoints = {
  xs: 0,
  // eslint-disable-next-line id-length
  s: 768,
  // eslint-disable-next-line id-length
  m: 1023,
  // eslint-disable-next-line id-length
  l: 1280,
  xl: 1536,
  xxl: 1920,
};

/**
 *
 */
export function useResize() {
  const mediumBreakpoint = 1023;

  const handleWindowSizeChange = (): void => {
    const screenWidth = document.body.clientWidth;
    smallResolution.value = screenWidth <= mediumBreakpoint;
  };

  return {
    smallResolution,
    handleWindowSizeChange,
    breakpoints,
  };
}
