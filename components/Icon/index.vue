<template>
  <component :is="`Icon${name}`"></component>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: 'Chevron',
    },
  },
}
</script>
