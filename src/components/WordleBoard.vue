<script setup lang="ts">
import englishWords from '@/englishWordsWith5Letters.json'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import { ref } from 'vue'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value)
  }
})

const guessInProgress = ref('')
const guessSubmitted = ref('')
</script>

<template>
  <input v-model="guessInProgress" type="text" @keydown.enter="guessSubmitted = guessInProgress" />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
