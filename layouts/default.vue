<template>
  <div class="bg-gray-100">
    <div
      :class="$store.state.theme"
      class="flex flex-col w-full min-h-screen transform duration-300 dark:bg-gray-700"
    >
      <main class="flex-1">
        <Header />
        <Nuxt />
      </main>
    </div>
  </div>
</template>
