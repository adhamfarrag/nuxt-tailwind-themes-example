<template>
  <div class="flex flex-row space-x-5">
    <div
      v-for="theme in themes"
      :key="theme.id"
      :value="theme.value"
      :class="[
        theme.value,
        $store.state.theme == theme.value
          ? ' bg-gray-500 dark:bg-teal-700  '
          : ' bg-transparent ',
      ]"
      class="w-20 h-10 rounded-md flex items-center justify-center text-center cursor-pointer select-none transform duration-300 text-skin-light dark:text-skin-dark"
      @click="selectTheme(theme)"
    >
      {{ theme.name }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentTheme: this.$store.state.theme,
      themes: [
        {
          id: 1,
          value: 'theme-default',
          name: 'Default',
          values: {
            primary: `50, 20, 10`,
            secomdary: `50, 20, 10`,
            muted: `50, 20, 10`,
            bright: `50, 20, 10`,
            accent: `8, 126, 173`,
            shade: `50, 20, 10`,
            tint: `50, 20, 10`,
            success: `50, 20, 10`,
            error: `50, 20, 10`,
            warning: `50, 20, 10`,
          },
        },
        {
          id: 2,
          value: 'theme-aqwa',
          name: 'Aqua',
          values: {
            primary: `9, 236, 243`,
            secomdary: `150, 111, 179`,
            muted: `59, 138, 196`,
            bright: `52, 93, 167`,
            accent: '255, 233, 153',
            shade: `50, 20, 10`,
            tint: `50, 20, 10`,
            info: `50, 20, 10`,
            success: `16, 185, 129`,
            error: `220, 38, 38`,
            warning: `241, 250, 140`,
          },
        },
        {
          id: 3,
          value: 'theme-cyberpunk',
          name: 'Cybepunk',
          values: {
            primary: `255,117,152`,
            secondary: '117,209,240',
            neutral: '66,63,0',
            bright: `52, 93, 167`,
            accent: '192,126,236',
            shade: `50, 20, 10`,
            tint: `50, 20, 10`,
            info: `139, 233, 253`,
            success: `80, 250, 123`,
            error: `255, 85, 85`,
            warning: `241, 250, 140`,
          },
        },
        {
          id: 4,
          value: 'theme-neon',
          name: 'Neon',
          values: {
            primary: `50, 20, 10`,
            secomdary: `50, 20, 10`,
            muted: `50, 20, 10`,
            bright: `50, 20, 10`,
            accent: '235, 244, 248',
            shade: `50, 20, 10`,
            tint: `50, 20, 10`,
            success: `50, 20, 10`,
            error: `50, 20, 10`,
            warning: `50, 20, 10`,
          },
        },
        {
          id: 5,
          value: 'theme-war',
          name: 'War',
          values: {
            primary: `204, 89, 85`,
            secomdary: `237, 188, 11`,
            muted: `31, 39, 51`,
            bright: `50, 20, 10`,
            accent: '44, 234, 244',
            shade: `148, 195, 225`,
            tint: `148, 195, 225`,
            success: `32, 126, 117`,
            error: `243, 145, 18`,
            warning: `230, 87, 71`,
          },
        },
      ],
    }
  },
  methods: {
    changeAccentColor(colorName, newValue) {
      if (process.client) {
        document.documentElement.style.setProperty(colorName, newValue)
      }
    },
    selectTheme(theme) {
      this.$store.dispatch('updateTheme', theme.value)

      for (const key in theme.values) {
        if (Object.hasOwnProperty.call(theme.values, key)) {
          this.changeAccentColor(`--color-${key}`, theme.values[key])
        }
      }
    },
  },
}
</script>
