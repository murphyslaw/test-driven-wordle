<script setup lang="ts">
import englishWords from '@/englishWordsWith5Letters.json'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'
import { computed, ref } from 'vue'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value)
  }
})

const guessInProgress = ref('')
const guessSubmitted = ref('')

const formattedGuessInProgress = computed({
  get() {
    return guessInProgress.value
  },
  set(value: string) {
    guessInProgress.value = value
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, '')
  }
})

function onSubmit() {
  if (!englishWords.includes(guessInProgress.value)) return

  guessSubmitted.value = guessInProgress.value
}
</script>

<template>
  <input
    v-model="formattedGuessInProgress"
    type="text"
    :maxlength="WORD_SIZE"
    @keydown.enter="onSubmit"
  />
  <p
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  ></p>
</template>
