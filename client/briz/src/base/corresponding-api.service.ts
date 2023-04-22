import { computed } from 'vue';
import {
  type ConfigProviderProps,
  createDiscreteApi,
  darkTheme,
} from 'naive-ui';

const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: darkTheme,
}));

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef,
  }
);

export function correspondingAPI() {
  return {
    message,
    notification,
    dialog,
    loadingBar,
  };
}
