<template>
  <div
    class="flex flex-col items-center text-skin-accent dark:text-skin-accent text-center select-none justify-center"
  >
    <!-- TODO: Add all theme colors in squares and adding their names and shades if possible -->

    <nuxt-content
      class="prose text-skin-accent mb-32 dark:text-skin-bright lg:prose-xl"
      :document="hello"
    />

    <div
      class="flex flex-col lg:flex-row space-y-10 items-center justify-between w-9/12"
    >
      <TextInput />

      <Card />

      <Button
        setType="Primary"
        size="Large"
        :disable="false"
        :loading="false"
        class="m-2 min-w-[350px]"
        href="https://google.com"
        label="Google"
        anchor
        blank
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const hello = await $content('hello').fetch()
    return { hello }
  },

  data() {
    return {
      form: {
        email: '',
      },
    }
  },
}
</script>
