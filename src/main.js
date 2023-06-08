import './assets/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import RugoVue from '@rugo-vn/vue';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(RugoVue);

app.mount('#app');
