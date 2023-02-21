const Color = require('color')
// require harmony from 'simple-color'
const harmony = require('simpler-color').harmony

// function to convert rgb to hex
function rgbToHex(r, g, b) {
  return Color.rgb(r, g, b).hex()
}

function generateTheme(mainColor) {
  let color = Color(mainColor)
  let theme = {
    primary: rgbToHex(color.rgb().color),
    secondary: rgbToHex(color.rotate(30).saturate(15).color),
    accent: rgbToHex(Color(color.rotate(90).saturate(80)).color),
    neutral: rgbToHex(color.saturate(5).color),
    shade: rgbToHex(color.darken(0.2).color),
    tint: rgbToHex(color.lighten(0.2).color),
    // base has to a shade of white/bright.
    base: rgbToHex(color.saturate(0).color),

    // should be always a shade of grean
    success: rgbToHex(Color('#00ff00').color),

    // should always ba a shade of orange
    warning: rgbToHex(Color('#ff9900').color),

    // should always be a shade of a red
    error: rgbToHex(Color('#ff0000').color),

    // should always be a shade of a blue
    info: rgbToHex(Color('#0000ff').color),
  }
  console.log('theme', theme)
  return theme
}

const baseColors = harmony('#7743CE')

console.log('baseColors', baseColors)
generateTheme('#7743CE')
