function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  theme: {
    extend: {
      colors: {
        skin: {
          primary: withOpacity('--color-primary'),
          secondary: withOpacity('--color-secondary'),
          muted: withOpacity('--color-muted'),
          bright: withOpacity('--color-bright'),
          accent: withOpacity('--color-accent'),
          shade: withOpacity('--color-shade'),
          tint: withOpacity('--color-tint'),
          success: withOpacity('--color-success'),
          warning: withOpacity('--color-warning'),
          error: withOpacity('--color-error'),
        },
      },
    },
  },
}
