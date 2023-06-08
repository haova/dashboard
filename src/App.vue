<script setup>
import axios from 'axios';
import { reactive } from 'vue';

const BASE_NPM = 'https://registry.npmjs.com';
const NPM_PACKAGES = [
  '@rugo-vn/vue',
  '@rugo-vn/server',
  '@rugo-vn/db',
  '@rugo-vn/fx',
  '@rugo-vn/open',
];

const npmPackages = reactive([]);

async function load() {
  for (const name of NPM_PACKAGES) {
    const { data } = await axios.get(`${BASE_NPM}/${name}`);
    npmPackages.push({
      name: data.name,
      latest: data['dist-tags'].latest,
      beta: data['dist-tags'].beta,
    });
  }
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
  </div>
</template>
