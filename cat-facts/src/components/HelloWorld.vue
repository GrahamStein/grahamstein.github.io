<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null);
const error = ref(null);
const apiAddress = 'https://catfact.ninja';
const requestType = ref('facts');
const requestParameters = 'limit';
const parameterAmount = ref(100);

const buildURL = () => {
  switch(requestType.value) {
    case 'breeds':
      return `${apiAddress}/breeds?${requestParameters}=${parameterAmount.value}`;
    case 'random':
      return `${apiAddress}/fact`;
    case 'facts':
      return `${apiAddress}/facts?${requestParameters}=${parameterAmount.value}`;
  }
}
console.log(buildURL());

onMounted(async () => {
  try {
    const response = await fetch(buildURL());
    if(!response.ok) throw new Error('Network Error')
    data.value = await response.json()
  }
  catch (err) {
    error.value = err.message

  }
});

const reloadData = async () => {
  try {
    const response = await fetch(buildURL());
    if(!response.ok) throw new Error('Network Error')
    data.value = await response.json()
    error.value = null;
  }
  catch (err) {
    error.value = err.message

  }
};

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>Cat API Explorer</h1>
<br>

<!-- Endpoint Selector -->
  <label>
    API Endpoint:
    <select v-model="requestType" id="">
      <option value="breeds">Breed Data</option>
      <option value="random">Random Cat Fact</option>
      <option value="facts">Listed Cat Facts</option>

    </select>
    <br>
    Records Requested:
    <select v-model="parameterAmount" id="">
      <option v-for="n in [1, 3, 5, 10, 20, 50, 100]" :key="n" :value="n">{{ n }}</option>
    </select>

    <!-- Manual Fetch Button -->
    <br>
    <br>
    <button @click="reloadData()">Reload Data</button>
  </label>

  <div>
    <h1>Posts</h1>

    <div v-if="error">{{ error}}</div>

    <div v-else-if="data">
<!--      {{ data }}-->
      <ul v-if="requestType === 'breeds'">
        Breed - Country - Origin - Coat - Pattern
        <li v-for="breed in data.data">{{ breed.breed  }} - {{ breed.country  }} - {{ breed.origin  }} - {{ breed.coat }} - {{ breed.pattern  }}</li>
      </ul>
      <ul v-else-if="requestType === 'random'">
        <li>{{ data.fact  }}</li>
      </ul>
      <ul v-else-if="requestType === 'facts'">
        <li v-for="facts in data.data">{{ facts.fact  }}</li>
      </ul>
    </div>
    <p v-else>Loading...</p>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
