import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'reflect-metadata';

import App from './App.vue';
import router from './router';

import './styles/main.scss';
import { createI18n } from 'vue-i18n';
import { messages } from '@/messages/messages';
import { UserService } from '@/core/user.service';
const { getAdminStatus } = UserService();

getAdminStatus();

const app = createApp(App);

const i18n = createI18n({
  legacy: false,
  locale: 'ru', // set locale
  fallbackLocale: 'en', // set fallback locale
  globalInjection: true,
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
