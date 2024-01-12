<script setup lang="ts">
import GuessInput from '@/components/GuessInput.vue'
import englishWords from '@/englishWordsWith5Letters.json'
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import { computed, ref } from 'vue'

const props = defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => englishWords.includes(value),
    required: true
  }
})

const guessSubmitted = ref('')
const gameMessage = computed(() =>
  guessSubmitted.value === props.wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE
)

function onSubmit(guess: string) {
  console.log('render message')
  guessSubmitted.value = guess
}
</script>

<template>
  <main>
    <guess-input @guess-submitted="onSubmit" />

    <p v-if="guessSubmitted.length > 0" class="game-message">{{ gameMessage }}</p>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

.game-message {
  font-size: 3rem;
  animation: game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}

@keyframes game-message-animation {
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
