<script setup lang="ts">
import englishWords from '@/englishWordsWith5Letters.json'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings'
import { ref, watchEffect } from 'vue'

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value),
    required: true
  }
})

const guessInProgress = ref('')
const guessSubmitted = ref('')

watchEffect(async () => {
  guessInProgress.value = guessInProgress.value
    .slice(0, WORD_SIZE)
    .toUpperCase()
    .replace(/[^A-Z]+/gi, '')
})

function onSubmit() {
  if (!englishWords.includes(guessInProgress.value)) return

  guessSubmitted.value = guessInProgress.value
}
</script>

<template>
  <main>
    <input v-model="guessInProgress" :maxlength="WORD_SIZE" type="text" @keydown.enter="onSubmit" />

    <p
      v-if="guessSubmitted.length > 0"
      class="end-of-game-message"
      v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

.end-of-game-message {
  font-size: 3rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}

@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
