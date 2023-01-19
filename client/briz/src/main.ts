import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import { createI18n } from 'vue-i18n';
import { messages } from '@/messages/messages';

const app = createApp(App);

const i18n = createI18n({
  locale: 'ru', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
