<script lang="ts" setup>
import englishWords from '@/englishWordsWith5Letters.json'
import { WORD_SIZE } from '@/settings'
import { ref, watchEffect } from 'vue'

const guessInProgress = ref('')
const emit = defineEmits<{
  'guess-submitted': [guess: string]
}>()

watchEffect(async () => {
  guessInProgress.value = guessInProgress.value
    .slice(0, WORD_SIZE)
    .toUpperCase()
    .replace(/[^A-Z]+/gi, '')
})

function onSubmit() {
  if (!englishWords.includes(guessInProgress.value)) {
    console.log('fooo', guessInProgress.value)
    return
  }

  emit('guess-submitted', guessInProgress.value)
}

function onBlur(event: FocusEvent) {
  const target = event.target as HTMLInputElement

  target.focus()
}
</script>

<template>
  <ul class="word">
    <li
      v-for="(letter, index) in guessInProgress.padEnd(WORD_SIZE, ' ')"
      :key="`${letter}-${index}`"
      :data-letter="letter"
      class="letter"
      v-text="letter"
    />
  </ul>

  <input
    v-model="guessInProgress"
    :maxlength="WORD_SIZE"
    autofocus
    type="text"
    @blur="onBlur"
    @keydown.enter="onSubmit"
  />
</template>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}

.word {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.25rem;
}

.letter {
  background-color: white;
  border: 1px solid hsl(0, 0%, 70%);
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;
}

li:not([data-letter=' ']) {
  animation: pop 100ms;
}

@keyframes pop {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.4);
  }
}
</style>
