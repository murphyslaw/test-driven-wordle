import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings'
import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'

describe('WordleBoard', () => {
  const wordOfTheDay = 'TESTS'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
  })

  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    const guessInput = wrapper.find('input[type=text')
    await guessInput.setValue('TESTS')
    await guessInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test('a defeat message appears when the user types a word that is incorrect', async () => {
    const guessInput = wrapper.find('input[type=text]')
    await guessInput.setValue('WRONG')
    await guessInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })

  test('no end-of-game message appears when the user has not yet made a guess', async () => {
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })
})
