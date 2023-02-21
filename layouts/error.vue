<template>
  <div
    :class="$store.state.theme"
    class="flex flex-col items-center justify-center h-full bg-gray-100 font-roboto"
  >
    <p class="text-3xl font-semibold text-skin-base">404</p>
    <p class="text-3xl font-semibold text-skin-base">
      What are you doing here?
    </p>
    <ThemeSwitcher />
  </div>
</template>
