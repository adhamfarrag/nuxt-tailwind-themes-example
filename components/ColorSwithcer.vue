<template>
  <Icon
    @click.native="changeColor"
    name="ColorMode"
    :class="$colorMode.preference === 'dark' ? '  rotate-0  ' : ' rotate-180 '"
    class="w-8 transform cursor-pointer hover:text-slate-600 duration-300 text-slate-400 h-8"
  />
</template>

<script>
export default {
  name: 'ColorSwitcher',
  methods: {
    changeColor() {
      this.$colorMode.preference =
        this.$colorMode.preference === 'dark' ? 'light' : 'dark'
    },
  },
}
</script>
