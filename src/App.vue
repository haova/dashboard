<script setup>
import axios from 'axios';
import { reactive } from 'vue';

const BASE_NPM = 'https://registry.npmjs.com';
const TRACKING_SITE_URL =
  'https://4vyaynz5w5.execute-api.ap-southeast-1.amazonaws.com/default/sigmoid/sites';
const NPM_PACKAGES = [
  '@rugo-vn/db',
  '@rugo-vn/fx',
  '@rugo-vn/live',
  '@rugo-vn/open',
  '@rugo-vn/vue',
  '@rugo-vn/server',
];

const npmPackages = reactive(
  NPM_PACKAGES.map((name) => ({ name, latest: null, beta: null }))
);
const trackingSites = reactive([]);

function assign(list, field, data) {
  for (const item of list) {
    if (item[field] !== data[field]) continue;

    for (const key in data) item[key] = data[key];
    return;
  }

  list.push(data);
}

async function loadNpmPackages() {
  for (const name of NPM_PACKAGES) {
    const { data } = await axios.get(`${BASE_NPM}/${name}`);
    assign(npmPackages, 'name', {
      name: data.name,
      latest: data['dist-tags'].latest,
      beta: data['dist-tags'].beta,
    });
  }

  setTimeout(loadNpmPackages, 10 * 60 * 1000); // every 10 mins
}

async function loadTrackingSites() {
  const { data } = await axios.get(TRACKING_SITE_URL);
  for (const item of data.Items) {
    assign(trackingSites, 'name', {
      name: item.name.S,
      url: item.url.S,
      status: item.status.S,
      updatedAt: parseInt(item.updatedAt.N),
    });
  }

  setTimeout(loadTrackingSites, 60 * 1000); // every 1 min
}

async function load() {
  loadNpmPackages();
  loadTrackingSites();
}

load();
</script>

<template>
  <div class="py-4">
    <h1 class="text-lg px-4">NPM Packages</h1>

    <div class="flex flex-wrap px-2">
      <div
        class="bg-white p-4 rounded border w-48 m-2"
        v-for="pkg in npmPackages"
        :key="pkg.name"
      >
        <h2 class="text-base font-semibold mb-2">{{ pkg.name }}</h2>
        <div>
          <span class="bg-sky-200">L: {{ pkg.latest || 'N/A' }}</span>
        </div>
        <div>
          <span class="bg-amber-200">B: {{ pkg.beta || 'N/A' }}</span>
        </div>
      </div>
    </div>

    <h1 class="text-lg px-4 mt-4">Tracking Sites</h1>

    <div class="flex flex-wrap px-2">
      <a
        class="bg-white p-4 rounded border w-48 m-2"
        v-for="site in trackingSites"
        :key="site.name"
        :href="site.url"
        target="_blank"
      >
        <h2 class="text-base font-semibold mb-2">{{ site.name }}</h2>
        <div v-if="site.status === 'online'">
          <span class="bg-lime-200">Online</span>
        </div>
        <div v-else>
          <span class="bg-rose-200">Offline</span>
        </div>
      </a>
    </div>
  </div>
</template>
