<template>
  <nav class="z-50 flex h-16 text-black bg-transparent zind">
    <div class="flex items-center">
      <button
        @click="drawer"
        class="w-20 h-10 rounded-md flex items-center justify-center text-center cursor-pointer select-none transform duration-300 text-skin-light dark:text-skin-dark"
      >
        Custom
      </button>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="fixed inset-0 z-10 transition-opacity"
      >
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      class="fixed top-0 right-0 p-3 flex flex-col items-center z-30 h-full bg-white overflow-auto transition-all duration-700 ease-in-out transform"
      :class="isOpen ? 'translate-x-0 w-80 ' : 'translate-x-full w-0 '"
    >
      <ColorPalette class="w-10/12" />
    </aside>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty('overflow', 'hidden')
          else document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false
    })
  },
}
</script>

<style>
.zind {
  z-index: 100;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
