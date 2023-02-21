<template>
  <client-only>
    <div class="flex flex-col items-center justify-between w-9/12">
      <form @submit.prevent="generate" id="paletteGenerate">
        <div>Pick theme type</div>

        <select
          name="theme-type"
          id="theme-type"
          v-model="picked"
          class="h-12 rounded-lg px-2.5 w-full mb-3 mt-1 border border-skin-accent"
        >
          <option value="complement">Complementary</option>
          <option value="split">Split Complementary</option>
          <option value="triad">Triadic</option>
          <option value="tetrad">Tetrad</option>
          <option value="analogous">Analogous</option>
        </select>

        <input
          v-model="color"
          type="text"
          class="px-2.5 py-2.5 h-12 placeholder-skin-primary rounded-lg border-2 border-skin-accent appearance-none focus:outline-none w-full focus:ring-skin-accent focus:border-skin-accent"
          placeholder="Hex color"
        />
        <Button
          type="submit"
          form="paletteGenerate"
          setType="Medium"
          size="Medium"
          :disable="false"
          :loading="false"
          class="w-full my-2.5"
          label="Generate"
        />
      </form>

      <section class="w-full flex flex-wrap h-full" id="palette">
        <section
          class="w-full h-12 flex flex-wrap paletteContainer m-2"
          v-bind:style="`background-color: ${primary}`"
          id="primary"
        ></section>

        <section
          class="w-full flex flex-wrap h-12 paletteContainer m-2"
          v-bind:style="`background-color: ${secondary}`"
          id="secondary"
        ></section>

        <section
          class="w-full flex flex-wrap h-12 paletteContainer m-2"
          v-bind:style="`background-color: ${accent}`"
          id="accent"
        ></section>

        <section
          class="w-full flex flex-wrap h-12 paletteContainer m-2"
          v-bind:style="`background-color: ${neutral}`"
          id="neutral"
        ></section>

        <section
          class="w-full flex flex-wrap h-12 paletteContainer m-2"
          v-bind:style="`background-color: ${error}`"
          id="error"
        ></section>
      </section>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      color: null,
      primary: '',
      secondary: '',
      accent: '',
      neutral: '',
      error: '',
      picked: 'complement',
    }
  },
  methods: {
    async generate() {
      try {
        if (this.color) {
          let hslColor = this.hexToHSL(this.color)
          console.log('hslColor', hslColor)

          let colors = null

          switch (this.picked) {
            case 'complement':
              colors = this.harmonize(hslColor, 180, 180, 1)
              break
            case 'split':
              colors = this.harmonize(hslColor, 150, 210, 60)
              break
            case 'triad':
              colors = this.harmonize(hslColor, 120, 240, 120)
              break
            case 'tetrad':
              colors = this.harmonize(hslColor, 90, 270, 90)
              break
            case 'analogous':
              colors = this.harmonize(hslColor, 30, 90, 30)
              break
            default:
              break
          }
          console.log('colors', colors)

          this.cleanView()
          this.drawColors(colors)
        }
      } catch (error) {
        console.log(error)
      }
    },
    drawColors(colors) {
      try {
        let theme = {}
        let types = ['primary', 'secondary', 'accent', 'neutral', 'error']

        for (let i = 0; i < colors.length; i++) {
          let color = colors[i]
          this[types[i]] = color

          const [h, s, l] = this.parseHSL(color)
          const rgbColor = this.HSLToRGB(h, s, l)
          theme[`--color-${types[i]}`] = rgbColor
        }
        this.$store.dispatch('updateTheme', 'theme-custom')
        this.$store.dispatch('AddCustomThemes', theme)
      } catch (error) {
        console.log(error)
      }
    },
    cleanView() {
      let myNode = document.getElementById('accent')
      myNode.innerHTML = ''
      myNode = document.getElementById('error')
      myNode.innerHTML = ''

      myNode = document.getElementById('neutral')
      myNode.innerHTML = ''

      myNode = document.getElementById('secondary')
      myNode.innerHTML = ''

      myNode = document.getElementById('primary')
      myNode.innerHTML = ''
    },
    harmonize(color, start, end, interval) {
      const colors = [color]
      const [h, s, l] = this.parseHSL(color)

      for (let i = start; i <= end; i += interval) {
        const h1 = (h + i) % 360
        const c1 = `hsl(${h1}, ${s}%, ${l}%)`
        colors.push(c1)
      }

      return colors
    },
    parseHSL(str) {
      var hsl, h, s, l
      hsl = str.replace(/[^\d,]/g, '').split(',') // strip non digits ('%')
      h = Number(hsl[0]) // convert to number
      s = Number(hsl[1])
      l = Number(hsl[2])
      return [h, s, l] // return parts
    },
    HSLToRGB(h, s, l) {
      s /= 100
      l /= 100
      const k = (n) => (n + h / 30) % 12
      const a = s * Math.min(l, 1 - l)
      const f = (n) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
      const rgb = [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))]
      return `${rgb[0]},${rgb[1]},${rgb[2]}`
    },
    hexToHSL(H) {
      // Convert hex to RGB first
      let r = 0,
        g = 0,
        b = 0
      if (H.length == 4) {
        r = '0x' + H[1] + H[1]
        g = '0x' + H[2] + H[2]
        b = '0x' + H[3] + H[3]
      } else if (H.length == 7) {
        r = '0x' + H[1] + H[2]
        g = '0x' + H[3] + H[4]
        b = '0x' + H[5] + H[6]
      }
      // Then to HSL
      r /= 255
      g /= 255
      b /= 255
      let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0

      if (delta == 0) h = 0
      else if (cmax == r) h = ((g - b) / delta) % 6
      else if (cmax == g) h = (b - r) / delta + 2
      else h = (r - g) / delta + 4

      h = Math.round(h * 60)

      if (h < 0) h += 360

      l = (cmax + cmin) / 2
      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
      s = +(s * 100).toFixed(1)
      l = +(l * 100).toFixed(1)

      // remove digits after decimal point
      s = s.toString().split('.')[0]
      l = l.toString().split('.')[0]

      return 'hsl(' + h + ',' + s + '%,' + l + '%)'
    },
    hexToRgb() {
      const sanitizedHex = hex.replaceAll('##', '#')
      const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        sanitizedHex
      )

      if (!colorParts) {
        return null
      }

      const [, r, g, b] = colorParts

      return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
      }
    },
    lighten(color, intensity) {
      let rgbColor = this.hexToRgb(color)

      let r = Math.round(color.r + (255 - color.r) * intensity)
      let g = Math.round(color.g + (255 - color.g) * intensity)
      let b = Math.round(color.b + (255 - color.b) * intensity)

      return this.rgbToHex(r, g, b)
    },
    darken(color, intensity) {
      let rgbColor = this.hexToRgb(color)

      const r = Math.round(color.r * intensity)
      const g = Math.round(color.g * intensity)
      const b = Math.round(color.b * intensity)

      return this.rgbToHex(r, g, b)
    },
    tailwindColorGenerator(color) {
      let schema = {}
      let intensityMap = {
        50: 0.95,
        100: 0.9,
        200: 0.75,
        300: 0.6,
        400: 0.3,
        600: 0.9,
        700: 0.75,
        800: 0.6,
        900: 0.49,
      }[(50, 100, 200, 300, 400)]
        .forEach((level) => {
          schema[level] = lighten(color, intensityMap[level])
        })

        [(600, 700, 800, 900)].forEach((level) => {
          schema[level] = darken(color, intensityMap[level])
        })

      console.log(schema)
      return schema
    },
  },
}
</script>

<style>
.paletteContainer > div {
  height: 100px;
  width: 100px;
  margin: 5px;
  border-radius: 100%;
  text-align: center;
  justify-items: center;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
