<template>
  <div class="flex flex-col items-start justify-start">
    <label class="block text-base font-medium text-skin-primary">{{
      label
    }}</label>
    <div class="mt-1 h-12 relative min-w-[350px]">
      <Icon
        name="Alert"
        class="w-8 h-8 absolute text-skin-accent top-2 right-3 transform cursor-pointer"
      />
      <input
        type="text"
        class="px-2.5 py-2.5 h-12 placeholder-skin-primary rounded-lg border-2 border-skin-accent appearance-none focus:outline-none w-full focus:ring-skin-accent focus:border-skin-accent"
        placeholder="Write Something"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Label',
    },
  },
}
</script>
