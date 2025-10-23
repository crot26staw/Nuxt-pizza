<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
::selection {
    background-color: transparent !important;
    color: inherit !important;
}

::-moz-selection {
    background-color: transparent !important;
    color: inherit !important;
}

::-webkit-selection {
    background-color: transparent !important;
    color: inherit !important;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>