import { defineStore } from 'pinia';

export const useStore = defineStore('generalStore', () => {
  // state
  const isMenuOpened = ref(false);

  // actions
  function toggleMenu() {
    isMenuOpened.value = !isMenuOpened.value;
  }

  // getters
  return { isMenuOpened, toggleMenu };
});
